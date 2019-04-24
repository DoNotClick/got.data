const MWBot = require('mwbot');
const cheerio = require('cheerio');

class ReligionScraper {
    constructor() {
        this.bot = new MWBot({
            apiUrl: FANDOM_API_URL
        });
    }

    async getAllNames() {
        let data = await this.bot.request({
            action: 'parse',
            format: 'json',
            page: 'Religion'
        });

        const $ = cheerio.load(data['parse']['text']['*']);

        let names = [];

        $('#Westeros').parent().nextUntil($('#Quotes').parent()).find('b a').each(function () {
            let $this = $(this);
            let info = {
                'name': null,
                'slug': null
            };

            if(!$this.attr('title') || !$this.attr('href').startsWith('/wiki/')) {
                return true;
            }

            info['name'] = $this.attr('title');
            info['slug'] = decodeURIComponent($this.attr('href').replace('/wiki/', ''));

            names.push(info);
        });

        return names.filter(function (item, pos) {
            for(let i = 0; i < pos; i++) {
                if(names[i]['slug'] === item['slug']) {
                    return false;
                }
            }

            return true;
        });
    }

    async scrapeAll() {
        let religions = await this.getAllNames();
        let data = [];

        for(let i = 0; i < religions.length; i++) {
            let religion = religions[i];

            console.log('[FandomReligionScraper] '.green + 'scraping', religion['name'], '(', (i + 1), '/', religions.length, ')');

            try {
                data.push(await this.scrape(religion['name'], religion['slug']));
            } catch(e) {
                if(e.code === 'invalidjson') {
                    i -= 1;

                    continue;
                }

                console.warn('[FandomReligionScraper] '.green + e);
            }
        }

        return data;
    }

    async scrape(name, page) {
        let data = await this.bot.request({
            action: 'parse',
            format: 'json',
            page: page
        });

        const $ = cheerio.load(data['parse']['text']['*']);

        // character object
        let result = {
            'name': name,
            'slug': page,
            'image': null,

            'type': [],
            'clergy': null,
            'locations': [],
            'leaders': [],
            'center': null
        };

        // scrape character image
        result['image'] = $('.pi-image-thumbnail').attr('src');

        // scrape personal description (right info box)
        $('.portable-infobox').find('.pi-item').each(function () {
            let $this = $(this);
            let $data = $this.find('.pi-data-value');

            switch($this.data('source')) {
                case 'Type':
                    $data.find('a').each(function () {
                        result['type'].push($(this).text());
                    });

                    break;
                case 'Clergy':
                    result['clergy'] = $data.find('a').text();

                    break;
                case 'Location':
                    $data.find('a').each(function () {
                        result['locations'].push($(this).text());
                    });

                    break;
                case 'Leader':
                    $data.find('a').each(function () {
                        result['leaders'].push($(this).text());
                    });

                    break;
                case 'Place':
                    result['center'] = $($data.find('a')[0]).text();

                    break;
                case 'Image':
                case 'Title':
                    break;
                default:
                //console.log($this.data("source"), ":", $data.html());
            }
        });

        return result;
    }
}

// sample religion output: https://pastebin.com/jduasnbq

module.exports = ReligionScraper;
