const MWBot = require('mwbot');
const cheerio = require('cheerio');
const rp = require('request-promise');

class AssassinScrapper {
    constructor() {
        this.bot = new MWBot({
            apiUrl: FANDOM_API_URL
        });
    }

    async getAllAssassin() {

        let options = {
            uri: 'https://gameofthrones.fandom.com/wiki/Category:Assassins',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        let assassins = [];
        await rp(options)
            .then(function ($) {
                // Process html like you would with jQuery...

                $('li[class=category-page__member]').each(function (index) {
                    let assassin = {'slug': null};
                    assassin.slug = $(this).children('a').attr('href').replace('/wiki/', '');

                    if(!assassin.slug.match(/Category/g)) {
                        assassins.push(assassin);
                    }

                });

            })
            .catch(function (err) {
            });


        return assassins;

    }
}


module.exports = AssassinScrapper;