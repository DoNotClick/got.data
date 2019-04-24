const MWBot = require('mwbot');
const cheerio = require('cheerio');

class HouseScraper {
    constructor() {
        this.bot = new MWBot({
            apiUrl: WESTEROS_API_URL
        });
    }

    /*
     * Returns a list of house names
     */
    async getAllNames() {
        let houses = [];

        //Iterate through all the houses
        console.log('[WesterosHouseScraper] '.green + 'Loading all houses from the wiki. This might take a while');

        let totalhits = 20;
        for(let i = 0; i < totalhits; i = i + 10) {
            //Setup up the api parameters
            let params = {
                action: 'query',
                titles: 'Houses Of Westeros',
                list: 'search',
                srsearch: 'house',
                format: 'json',
                sroffset: String(i)
            };

            let data;
            try {
                data = await this.bot.request(params);
            } catch(e) {
                console.warn('[WesterosHouseScraper] '.green + e);

                continue;
            }

            totalhits = parseInt(data['query']['searchinfo']['totalhits']);

            for(let j = 0; j < data.query.search.length; j++) {
                let title = String(data.query.search[j].title);

                if(title === null) {
                    break;
                }

                houses.push({
                    'name': decodeURIComponent(title),
                    'slug': decodeURIComponent(title)
                });
            }

            console.log('[WesterosHouseScraper] '.green + 'loading houses (', houses.length, '/', totalhits, ')');
        }

        return houses.filter(function (item, pos) {
            for(let i = 0; i < pos; i++) {
                if(houses[i]['slug'] === item['slug']) {
                    return false;
                }
            }

            return true;
        });
    }

    /*
     * Call when you want to fetch all house information
     */
    async getAll() {
        let houses = await this.getAllNames();
        let data = [];

        for(let i = 0; i < houses.length; i++) {
            console.log('[WesterosHouseScraper] '.green + 'scraping', houses[i]['name'], '(', (i + 1), '/', houses.length, ')');

            try {
                data.push(await this.get(houses[i]['name'], houses[i]['slug']));
            } catch(e) {
                if(e.code === 'invalidjson') {
                    i -= 1;

                    continue;
                }

                console.warn('[WesterosHouseScraper] '.green + e);
            }
        }

        return data;
    }

    /*
     * Fetches details for one house
     */
    async get(house, page) {
        let data = await this.bot.request({
            action: 'parse',
            page: page,
            format: 'json'
        });


        let $ = cheerio.load(data['parse']['text']['*']);

        let result = {
            'name': house,
            'slug': page,
            'image': null,
            'titles': [],

            'coatOfArms': null,
            'words': null,
            'currentLord': null,
            'overlords': [],

            'seat': null,
            'region': null,
            'ancestralWeapon': [],

            'founded': null,
            'founder': null,
            'cadetBranch': null,
            'heir': null,
            'isExtinct': false
        };

        let houses = [];

        $('.infobox').find('tr').each(function (i) {
            if(i < 2) {
                return true;
            }

            let $this = $(this);
            let $data = $this.find('td');
            let d = null;

            switch($this.find('th').text().trim()) {
                case 'Coat of arms':
                    result['coatOfArms'] = $data.text().trim();

                    break;
                case 'Words':
                    result['words'] = $data.text().trim();

                    break;
                case 'Seat':
                    result['seat'] = $($data.find('a')[0]).text().trim();

                    break;
                case 'Lord':
                    result['currentLord'] = $($data.find('a')[0]).text().trim();

                    break;
                case 'Region':
                    result['region'] = $($data.find('a')[0]).text().trim();

                    break;
                case 'Title':
                    $data.find('a').each(function () {
                        result['titles'].push($(this).text());
                    });

                    break;
                case 'Heir':
                    result['heir'] = $($data.find('a')[0]).text().trim();

                    break;
                case 'Overlord':
                    $data.find('a').each(function () {
                        result['overlords'].push($(this).text());
                    });

                    break;
                case 'Cadet':
                    result['cadetBranch'] = $($data.find('a')[0]).text().trim();

                    break;
                case 'Branch':
                    result['cadetBranch'] = $($data.find('a')[0]).text().trim();

                    break;
                case 'Cadet Branch':
                    result['cadetBranch'] = $($data.find('a')[0]).text().trim();

                    break;
                case 'Ancestral Weapon':
                    result['d'] = $($data.find('a')[0]).text().trim();

                    if(d) {
                        result['ancestralWeapon'] = d;
                    }

                    break;
                case 'Founder':
                    d = $($data.find('a')[0]).text().trim();

                    if(d) {
                        result['founder'] = d;
                    }

                    break;
                case 'Founded':
                    d = parseInt($($data.find('a')[0]).text().replace(/[^0-9.]/g, ''));

                    if(d) {
                        result['founded'] = d;
                    }

                    break;
                default:
                //console.log($this.find("th").text().trim(), $data.html());
            }
        });

        //fetch the image
        let imgLink = $('.infobox-image img').attr('src');

        if(imgLink !== undefined) {
            result['image'] = 'https://awoiaf.westeros.org' + imgLink;
        }

        return result;
    }
}

// sample result: https://pastebin.com/YauBCHjN

module.exports = HouseScraper;