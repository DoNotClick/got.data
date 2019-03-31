const MWBot = require('mwbot');
const cheerio = require('cheerio');
const rp = require('request-promise');

class HouseScrapper {
    constructor() {
        this.bot = new MWBot({
            apiUrl: 'https://gameofthrones.fandom.com/api.php'
        });
    }

    async getAllHousesRaw() {

        var options = {
            uri: 'https://gameofthrones.fandom.com/wiki/Category:Noble_houses',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        var houses = []
        await rp(options)
            .then(function ($) {
                // Process html like you would with jQuery...
                
                $('li[class=category-page__member]').each(function( index ) {
                    var house = {"title": null, "reference": null};
                    house.title = $(this).children('a').attr('title')
                    house.reference = $(this).children('a').attr('href')
                    
                    if(!house.title.match(/Category/g)) {
                        houses.push(house);
                    }
                  
                });

            })
            .catch(function (err) {
            });


        var options2 = {
            uri: 'https://gameofthrones.fandom.com/wiki/Category:Noble_houses?from=North%0AHouses+from+the+North',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        await rp(options2)
            .then(function ($) {
                // Process html like you would with jQuery...
                
                $('li[class=category-page__member]').each(function( index ) {
                    var house = {"title": null, "reference": null};
                    house.title = $(this).children('a').attr('title')
                    house.reference = $(this).children('a').attr('href')
                    console.log(house.title);

                    if(!house.title.match(/Category/g)) {
                        houses.push(house);
                    }
                  
                });

            })
            .catch(function (err) {
            });



            console.log(houses);

            return houses;

    }

    async scrape(house) {
        let data = null;
        try {
            data = await this.bot.request({
                action: "parse",
                format: "json",
                page: decodeURIComponent(house.reference.substr(6))
            });
        } catch (err) {
            return false;
        }

        var houseItem = {};

        houseItem.name = house.title;

        const $ = cheerio.load(data["parse"]["text"]["*"]);

        houseItem.logoURL = $(".pi-image-thumbnail").attr("src");

        let $infobox = $(".portable-infobox");

        if($('div[data-source=Sigil]') != null) {
            houseItem.sigil = $('div[data-source=Sigil]').find(".pi-data-value").text()
        }

        if($('div[data-source=Words]') != null) {
            houseItem.words = $('div[data-source=Words]').find(".pi-data-value").text()
        }

        houseItem.seat = []

        if($('div[data-source=Seat]') != null) {

            var seat = $('div[data-source=Seat]').find(".pi-data-value").html()

            if(seat != null) {
                seat = seat.match(/title="(.*?)"/g);

                if(seat) {
                    seat.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    houseItem.seat.push(el);
                });
                }

                
            }

        }

        houseItem.allegiance = []

        if($('div[data-source=Allegiance]') != null) {

            var allegiance = $('div[data-source=Allegiance]').find(".pi-data-value").html()

            if(allegiance != null) {
                allegiance = allegiance.match(/title="(.*?)"/g);

                if(allegiance) {
                    allegiance.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    houseItem.allegiance.push(el);
                });
                }

                
            }

        }

        houseItem.religion = []

        if($('div[data-source=Religion]') != null) {

            var religion = $('div[data-source=Religion]').find(".pi-data-value").html()

            if(religion != null) {
                religion = religion.match(/title="(.*?)"/g);

                if(religion) {
                    religion.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    houseItem.religion.push(el);
                });
                }

                
            }

        }

        houseItem.region = []

        if($('div[data-source=Region]') != null) {

            var region = $('div[data-source=Region]').find(".pi-data-value").html()

            if(region != null) {
                region = region.match(/title="(.*?)"/g);

                if(region) {
                    region.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'');
                    houseItem.region.push(el);
                });
                }

                
            }

        }

        
        console.log(houseItem);
        return houseItem;
    }

    async scrapeAll() {
        let houses = await this.getAllHousesRaw();
        let data = [];

        for(let i = 0; i < houses.length; i++) {
            console.log("started scraping ", houses[i]);
            let e = await this.scrape(houses[i]);

            console.log(e);

            if (e)
                data.push(e);
            else
                console.log("invalid page");
        }
        
        
        return data;
    }
}


module.exports = HouseScrapper;