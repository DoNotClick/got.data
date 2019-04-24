const MWBot = require('mwbot');
const cheerio = require('cheerio');
const rp = require('request-promise');

class CityScrapper {
    constructor() {
        this.bot = new MWBot({
            apiUrl: FANDOM_API_URL
        });
    }

    async getAllCitysRaw() {
        let options = {
            uri: 'https://gameofthrones.fandom.com/wiki/Category:Cities',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        let cities = [];
        await rp(options)
            .then(function ($) {
                // Process html like you would with jQuery...

                $('li[class=category-page__member]').each(function (index) {
                    let city = {
                        'title': null,
                        'reference': null
                    };
                    city.title = $(this).children('a').attr('title');
                    city.reference = $(this).children('a').attr('href');

                    if(!city.title.match(/Category/g)) {
                        cities.push(city);
                    }

                });

            })
            .catch(function (err) {
            });

        return cities;

    }

    async scrape(city) {
        let data = await this.bot.request({
            action: 'parse',
            format: 'json',
            page: decodeURIComponent(city.reference.substr(6))
        });

        let cityItem = {};

        cityItem.name = city.title;

        const $ = cheerio.load(data['parse']['text']['*']);

        let $infobox = $('.portable-infobox');

        if($('div[data-source=Location]') != null) {
            cityItem.location = $('div[data-source=Location]').find('.pi-data-value').text().replace(/\[\d+\]+/g, '').replace(/&apos;/g, '\'').replace(/&amp;/g, '&').replace(/\([^()]*\)/g, '').replace(/&#x2020;/g, '&').replace(/[,].*/g, '');
        }

        if($('div[data-source=Type]') != null) {
            cityItem.type = $('div[data-source=Type]').find('.pi-data-value').text().replace(/\[\d+\]+/g, '').replace(/&apos;/g, '\'').replace(/&amp;/g, '&').replace(/\([^()]*\)/g, '').replace(/&#x2020;/g, '&');
        }

        cityItem.rulers = [];

        if($('div[data-source=Rulers]') != null) {
            let rulers = $('div[data-source=Rulers]').find('.pi-data-value').html();

            if(rulers != null) {
                rulers = rulers.match(/title="(.*?)"/g);

                if(rulers) {
                    rulers.forEach(function (element) {
                        let el = element.replace(/title=/g, '').replace(/"/g, '');
                        cityItem.rulers.push(el);
                    });
                }


            }
        }

        cityItem.religion = [];

        if($('div[data-source=Religion]') != null) {

            let religion = $('div[data-source=Religion]').find('.pi-data-value').html();

            if(religion != null) {
                religion = religion.match(/title="(.*?)"/g);

                if(religion) {
                    religion.forEach(function (element) {
                        let el = element.replace(/title=/g, '').replace(/"/g, '');
                        cityItem.religion.push(el);
                    });
                }


            }


        }

        cityItem.founder = [];
        if($('div[data-source=Founder]') != null) {

            let founder = $('div[data-source=Founder]').find('.pi-data-value').html();

            if(founder != null) {
                founder = founder.match(/title="(.*?)"/g);

                founder.forEach(function (element) {
                    let el = element.replace(/title=/g, '').replace(/"/g, '');
                    cityItem.founder.push(el);
                });
            }
        }

        cityItem.placesOfNote = [];
        if($('div[data-source=Places]') != null) {

            let placesOfNote = $('div[data-source=Places]').find('.pi-data-value').html();

            if(placesOfNote != null) {
                placesOfNote = placesOfNote.match(/title="(.*?)"/g);

                if(placesOfNote) {
                    placesOfNote.forEach(function (element) {
                        let el = element.replace(/title=/g, '').replace(/"/g, '');
                        cityItem.placesOfNote.push(el);
                    });
                }

            }
        }

        return cityItem;
    }

    async scrapeAll() {
        let cities = await this.getAllCitysRaw();
        let data = [];

        for(let i = 0; i < cities.length; i++) {
            console.log('[FandomCityScraper] '.green + 'started scraping ', cities[i]);

            try {
                data.push(await this.scrape(cities[i]));
            } catch(e) {
                if(e.code === 'invalidjson') {
                    i -= 1;

                    continue;
                }

                console.warn('[FandomCityScraper] '.green + e);
            }
        }


        return data;
    }
}


module.exports = CityScrapper;