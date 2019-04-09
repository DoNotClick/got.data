const MWBot = require('mwbot');
const cheerio = require('cheerio');
const rp = require('request-promise');

class BastardScrapper {
    constructor() {
        this.bot = new MWBot({
            apiUrl: 'https://gameofthrones.fandom.com/api.php'
        });
    }

    async getAllBastards() {

        let options = {
            uri: 'https://gameofthrones.fandom.com/wiki/Category:Bastards',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        let bastards = [];
        await rp(options)
            .then(function ($) {
                // Process html like you would with jQuery...

                $('li[class=category-page__member]').each(function (index) {
                    let bastard = {"name": null};
                    bastard.name = $(this).children('a').attr('title');
                    console.log('[FandomBastardScraper] '.green + 'scraping bastard: ' + bastard.name);

                    if(!bastard.name.match(/Category/g)) {
                        bastards.push(bastard);
                    }

                });

            })
            .catch(function (err) {
            });


        return bastards;

    }
}


module.exports = BastardScrapper;