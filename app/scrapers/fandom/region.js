const MWBot = require('mwbot');
const cheerio = require('cheerio');
const rp = require('request-promise');

class RegionScrapper {
    constructor() {
        this.bot = new MWBot({
            apiUrl: FANDOM_API_URL
        });
    }

    async getAllRegionsRaw() {

        let options = {
            uri: 'https://gameofthrones.fandom.com/wiki/Category:Regions',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        let regions = [];
        await rp(options)
            .then(function ($) {
                // Process html like you would with jQuery...

                $('li[class=category-page__member]').each(function (index) {
                    let region = {
                        'title': null,
                        'reference': null
                    };
                    region.title = $(this).children('a').attr('title');
                    region.reference = $(this).children('a').attr('href');

                    if(!region.title.match(/Category/g)) {
                        regions.push(region);
                    }

                });

            })
            .catch(function (err) {
            });

        return regions;

    }

    async scrape(region) {
        let data = await this.bot.request({
            action: 'parse',
            format: 'json',
            page: decodeURIComponent(region.reference.substr(6))
        });

        let regionItem = {};

        regionItem.name = region.title;

        const $ = cheerio.load(data['parse']['text']['*']);

        let $infobox = $('.portable-infobox');

        if($('div[data-source=Location]') != null) {
            regionItem.location = $('div[data-source=Location]').find('.pi-data-value').text().replace(/\[\d+\]+/g, '').replace(/&apos;/g, '\'').replace(/&amp;/g, '&').replace(/\([^()]*\)/g, '').replace(/&#x2020;/g, '&').replace(/[,].*/g, '');
        }

        if($('div[data-source=Geography]') != null) {
            regionItem.geography = $('div[data-source=Geography]').find('.pi-data-value').text().replace(/\[\d+\]+/g, '').replace(/&apos;/g, '\'').replace(/&amp;/g, '&').replace(/\([^()]*\)/g, '').replace(/&#x2020;/g, '&');
        }

        regionItem.rulers = [];

        if($('div[data-source=Rulers]') != null) {
            let rulers = $('div[data-source=Rulers]').find('.pi-data-value').html();

            if(rulers != null) {
                rulers = rulers.match(/title="(.*?)"/g);

                if(rulers) {
                    rulers.forEach(function (element) {
                        let el = element.replace(/title=/g, '').replace(/"/g, '');
                        regionItem.rulers.push(el);
                    });
                }


            }
        }

        regionItem.religion = [];

        if($('div[data-source=Religion]') != null) {

            let religion = $('div[data-source=Religion]').find('.pi-data-value').html();

            if(religion != null) {
                religion = religion.match(/title="(.*?)"/g);

                religion.forEach(function (element) {
                    let el = element.replace(/title=/g, '').replace(/"/g, '');
                    regionItem.religion.push(el);
                });
            }


        }

        regionItem.culture = [];

        if($('div[data-source=Culture]') != null) {

            let culture = $('div[data-source=Culture]').find('.pi-data-value').html();

            if(culture != null) {
                culture = culture.match(/title="(.*?)"/g);

                culture.forEach(function (element) {
                    let el = element.replace(/title=/g, '').replace(/"/g, '');
                    regionItem.culture.push(el);
                });
            }


        }


        if($('div[data-source="Regional capital"]') != null) {
            regionItem.regionCapital = $('div[data-source="Regional capital"]').find('.pi-data-value').text().replace(/\[\d+\]+/g, '').replace(/&apos;/g, '\'').replace(/&amp;/g, '&').replace(/\([^()]*\)/g, '').replace(/&#x2020;/g, '&');
        }


        regionItem.cities = [];
        if($('div[data-source=Cities]') != null) {

            let cities = $('div[data-source=Cities]').find('.pi-data-value').html();

            if(cities != null) {
                cities = cities.match(/title="(.*?)"/g);

                cities.forEach(function (element) {
                    let el = element.replace(/title=/g, '').replace(/"/g, '');
                    regionItem.cities.push(el);
                });
            }
        }


        regionItem.towns = [];
        if($('div[data-source=Towns]') != null) {

            let towns = $('div[data-source=Towns]').find('.pi-data-value').html();

            if(towns != null) {
                towns = towns.match(/title="(.*?)"/g);

                towns.forEach(function (element) {
                    let el = element.replace(/title=/g, '').replace(/"/g, '');
                    regionItem.towns.push(el);
                });
            }
        }

        regionItem.castles = [];
        if($('div[data-source=Castles]') != null) {

            let castles = $('div[data-source=Castles]').find('.pi-data-value').html();

            if(castles != null) {
                castles = castles.match(/title="(.*?)"/g);

                castles.forEach(function (element) {
                    let el = element.replace(/title=/g, '').replace(/"/g, '');
                    regionItem.castles.push(el);
                });
            }
        }


        regionItem.founder = [];
        if($('div[data-source=Founder]') != null) {

            let founder = $('div[data-source=Founder]').find('.pi-data-value').html();

            if(founder != null) {
                founder = founder.match(/title="(.*?)"/g);

                founder.forEach(function (element) {
                    let el = element.replace(/title=/g, '').replace(/"/g, '');
                    regionItem.founder.push(el);
                });
            }
        }

        regionItem.placesOfNote = [];
        if($('div[data-source=Places]') != null) {

            let placesOfNote = $('div[data-source=Places]').find('.pi-data-value').html();

            if(placesOfNote != null) {
                placesOfNote = placesOfNote.match(/title="(.*?)"/g);

                placesOfNote.forEach(function (element) {
                    let el = element.replace(/title=/g, '').replace(/"/g, '');
                    regionItem.placesOfNote.push(el);
                });
            }
        }

        return regionItem;
    }

    async scrapeAll() {
        let regions = await this.getAllRegionsRaw();
        let data = [];

        for(let i = 0; i < regions.length; i++) {
            console.log('[FandomRegionScraper] '.green + 'started scraping ', regions[i]);

            try {
                data.push(await this.scrape(regions[i]));
            } catch(e) {
                if(e.code === 'invalidjson') {
                    i -= 1;

                    continue;
                }

                console.warn('[FandomRegionScraper] '.green + e);
            }
        }

        return data;
    }
}


module.exports = RegionScrapper;