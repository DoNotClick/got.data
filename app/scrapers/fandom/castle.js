const MWBot = require('mwbot');
const cheerio = require('cheerio');
const rp = require('request-promise');

class CastleScrapper {
    constructor() {
        this.bot = new MWBot({
            apiUrl: FANDOM_API_URL
        });
    }

    async getAllCastlesRaw() {

        let options = {
            uri: 'https://gameofthrones.fandom.com/wiki/Category:Castles',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        let castles = [];
        await rp(options)
            .then(function ($) {
                // Process html like you would with jQuery...

                $('li[class=category-page__member]').each(function (index) {
                    let castle = {
                        'title': null,
                        'reference': null
                    };
                    castle.title = $(this).children('a').attr('title');
                    castle.reference = $(this).children('a').attr('href');

                    if(!castle.title.match(/Category/g)) {
                        castles.push(castle);
                    }

                });

            })
            .catch(function (err) {
            });

        return castles;

    }

    async scrape(castle) {
        let data = await this.bot.request({
            action: 'parse',
            format: 'json',
            page: decodeURIComponent(castle.reference.substr(6))
        });

        let castleItem = {};

        castleItem.name = castle.title;

        const $ = cheerio.load(data['parse']['text']['*']);

        let $infobox = $('.portable-infobox');

        if($('div[data-source=Location]') != null) {
            castleItem.location = $('div[data-source=Location]').find('.pi-data-value').text().replace(/\[\d+\]+/g, '').replace(/&apos;/g, '\'').replace(/&amp;/g, '&').replace(/\([^()]*\)/g, '').replace(/&#x2020;/g, '&').replace(/[,].*/g, '');
        }

        if($('div[data-source=Type]') != null) {
            castleItem.type = $('div[data-source=Type]').find('.pi-data-value').text().replace(/\[\d+\]+/g, '').replace(/&apos;/g, '\'').replace(/&amp;/g, '&').replace(/\([^()]*\)/g, '').replace(/&#x2020;/g, '&');
        }

        if($('div[data-source=Age]') != null) {
            castleItem.age = parseInt($('div[data-source=Age]').find('.pi-data-value').text().replace(/\[\d+\]+/g, '').replace(/&apos;/g, '\'').replace(/&amp;/g, '&').replace(/\([^()]*\)/g, '').replace(/&#x2020;/g, '&').replace(/[^0-9.]/g, ''));
        }

        castleItem.founder = [];
        if($('div[data-source=Founder]') != null) {

            let founder = $('div[data-source=Founder]').find('.pi-data-value').html();

            if(founder != null) {
                founder = founder.match(/title="(.*?)"/g);

                founder.forEach(function (element) {
                    let el = element.replace(/title=/g, '').replace(/"/g, '');
                    castleItem.founder.push(el);
                });
            }
        }

        castleItem.religion = [];

        if($('div[data-source=Religion]') != null) {

            let religion = $('div[data-source=Religion]').find('.pi-data-value').html();

            if(religion != null) {
                religion = religion.match(/title="(.*?)"/g);

                religion.forEach(function (element) {
                    let el = element.replace(/title=/g, '').replace(/"/g, '');
                    castleItem.religion.push(el);
                });
            }


        }

        castleItem.rulers = [];

        if($('div[data-source=Rulers]') != null) {
            let rulers = $('div[data-source=Rulers]').find('.pi-data-value').html();

            if(rulers != null) {
                rulers = rulers.match(/title="(.*?)"/g);

                if(rulers) {
                    rulers.forEach(function (element) {
                        let el = element.replace(/title=/g, '').replace(/"/g, '');
                        castleItem.rulers.push(el);
                    });
                }


            }
        }


        return castleItem;
    }

    async scrapeAll() {
        let castles = await this.getAllCastlesRaw();
        let data = [];

        for(let i = 0; i < castles.length; i++) {
            console.log('[FandomCastleScraper] '.green + 'started scraping ', castles[i]);

            try {
                data.push(await this.scrape(castles[i]));
            } catch(e) {
                if(e.code === 'invalidjson') {
                    i -= 1;

                    continue;
                }

                console.warn('[FandomCastleScraper] '.green + e);
            }
        }


        return data;
    }
}


module.exports = CastleScrapper;