const MWBot = require('mwbot');
const cheerio = require('cheerio');
const rp = require('request-promise');

class AnimalScrapper {
    constructor() {
        this.bot = new MWBot({
            apiUrl: FANDOM_API_URL
        });
    }

    async getAllAnimalsRaw() {

        let options = {
            uri: 'https://gameofthrones.fandom.com/wiki/Category:Animals',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        let animals = [];
        await rp(options)
            .then(function ($) {
                // Process html like you would with jQuery...

                $('li[class=category-page__member]').each(function (index) {
                    let animal = {"title": null, "reference": null};
                    animal.title = $(this).children('a').attr('title')
                    animal.reference = $(this).children('a').attr('href')

                    if(!animal.title.match(/Category/g)) {
                        animals.push(animal);
                    }

                });

            }).catch(function (err) {

            });

        return animals;

    }

    async scrape(animal) {
        let data = await this.bot.request({
            action: "parse",
            format: "json",
            page: decodeURIComponent(animal.reference.substr(6))
        });

        let animalItem = {};

        animalItem.name = animal.title;

        const $ = cheerio.load(data["parse"]["text"]["*"]);

        let $infobox = $(".portable-infobox");

        if($('div[data-source=Type]') != null) {
            animalItem.location = $('div[data-source=Type]').find(".pi-data-value").text().replace(/\[\d+\]+/g, '').replace(/&apos;/g, "'").replace(/&amp;/g, "&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g, "&").replace(/[,].*/g, '');
        }

        if($('div[data-source=Diet]') != null) {
            animalItem.diet = $('div[data-source=Diet]').find(".pi-data-value").text().replace(/\[\d+\]+/g, '').replace(/&apos;/g, "'").replace(/&amp;/g, "&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g, "&");
        }

        if($('div[data-source=Status]') != null) {
            animalItem.status = $('div[data-source=Status]').find(".pi-data-value").text().replace(/\[\d+\]+/g, '').replace(/&apos;/g, "'").replace(/&amp;/g, "&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g, "&");
        }


        animalItem.habitat = []

        if($('div[data-source=Habitat]') != null) {
            let range = $('div[data-source=Habitat]').find(".pi-data-value").html()

            if(range) {
                range = range.split('<br>')

                range.forEach(function (element) {
                    let el = element.replace(/\*?<(?:.|\n)*?>/gm, '').trim().replace(/\[\d+\]+/g, '').replace(/&apos;/g, "'").replace(/&amp;/g, "&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g, "&");

                    if(el != "") {

                        animalItem.habitat.push(el);
                    }
                });
            }


        }

        animalItem.range = []

        if($('div[data-source=Range]') != null) {
            let range = $('div[data-source=Range]').find(".pi-data-value").html()

            if(range != null) {
                range = range.match(/title="(.*?)"/g);

                if(range) {
                    range.forEach(function (element) {
                        let el = element.replace(/title=/g, '').replace(/"/g, '').replace(/\[\d+\]+/g, '').replace(/&apos;/g, "'").replace(/&amp;/g, "&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g, "&");
                        animalItem.range.push(el);
                    });
                }


            }
        }

        return animalItem;
    }

    async scrapeAll() {
        let animals = await this.getAllAnimalsRaw();
        let data = [];

        for(let i = 0; i < animals.length; i++) {
            console.log('[FandomAnimalScraper] '.green + "started scraping ", animals[i]);

            try {
                data.push(await this.scrape(animals[i]));
            }
            catch(e) {
                console.warn('[FandomAnimalScraper] '.green + e);
            }
        }


        return data;
    }
}


module.exports = AnimalScrapper;