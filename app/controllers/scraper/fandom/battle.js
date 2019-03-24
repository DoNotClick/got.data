const MWBot = require('mwbot');
const cheerio = require('cheerio');
const rp = require('request-promise');

class BattleScrapper {
    constructor() {
        this.bot = new MWBot({
            apiUrl: 'https://gameofthrones.fandom.com/api.php'
        });
    }

    async getAllBattlesRaw() {

        var options = {
            uri: 'https://gameofthrones.fandom.com/wiki/Category:Battles',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        var battles = []
        await rp(options)
            .then(function ($) {
                // Process html like you would with jQuery...
                
                $('li[class=category-page__member]').each(function( index ) {
                    var battle = {"title": null, "reference": null};
                    battle.title = $(this).children('a').attr('title')
                    battle.reference = $(this).children('a').attr('href')
                    // console.log(battle.title);

                    if(!battle.title.match(/Category/g)) {
                        battles.push(battle);
                    }
                  
                });

            })
            .catch(function (err) {
            });

            // console.log(battles);

            return battles;

    }

    async scrape(battle) {
        let data = null;
        try {
            data = await this.bot.request({
                action: "parse",
                format: "json",
                page: decodeURIComponent(battle.reference.substr(6))
            });
        } catch (err) {
            return false;
        }

        var battleItem = {};

        battleItem.name = battle.title;
        battleItem.slug = battle.reference.substr(6);
        const $ = cheerio.load(data["parse"]["text"]["*"]);

        let $infobox = $(".portable-infobox");

        if($('div[data-source=conflict]') != null) {
            battleItem.conflict = $('div[data-source=conflict]').find(".pi-data-value").text();
        }

        if($('div[data-source=date]') != null) {
            battleItem.dateOfBattle = $('div[data-source=date]').find(".pi-data-value").text();
        }

        if($('div[data-source=place]') != null) {
            battleItem.place = ($('div[data-source=place]').find(".pi-data-value").text().replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&")).split(",");
        }
        



        battleItem.factionsOne = []

        if($('td[data-source=side1]').html() != null) {

            var side1 = $('td[data-source=side1]').html().split('<br>')

            side1.forEach(function(element) {
                var el = element.replace(/\*?<(?:.|\n)*?>/gm, '').trim().replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&");

                if(el != "") {

                    battleItem.factionsOne.push(el);
                }
            });
        }
        


        battleItem.factionsTwo = []


        if($('td[data-source=side2]').html() != null) {
            var side2 = $('td[data-source=side2]').html().split('<br>')

            side2.forEach(function(element) {
                var el = element.replace(/\*?<(?:.|\n)*?>/gm, '').trim().replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&");

                if(el != "") {

                    battleItem.factionsTwo.push(el);
                }
            });
        }

        battleItem.commandersOne = []

        if($('td[data-source=commanders1]').html() != null) {

            var side1 = $('td[data-source=commanders1]').html().split('<br>')

            side1.forEach(function(element) {
                var el = element.replace(/\*?<(?:.|\n)*?>/gm, '').trim().replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&");

                if(el != "") {

                    battleItem.commandersOne.push(el);
                }
            });
        }
        


        battleItem.commandersTwo = []


        if($('td[data-source=commanders2]').html() != null) {
            var side2 = $('td[data-source=commanders2]').html().split('<br>')

            side2.forEach(function(element) {
                var el = element.replace(/\*?<(?:.|\n)*?>/gm, '').trim().replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&");

                if(el != "") {

                    battleItem.commandersTwo.push(el);
                }
            });
        }

        battleItem.forcesOne = []

        if($('td[data-source=forces1]').html() != null) {

            var side1 = $('td[data-source=forces1]').html().split('<br>')

            side1.forEach(function(element) {
                var el = element.replace(/\*?<(?:.|\n)*?>/gm, '').trim().replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&");

                if(el != "") {

                    battleItem.forcesOne.push(el);
                }
            });
        }
        


        battleItem.forcesTwo = []


        if($('td[data-source=forces2]').html() != null) {
            var side2 = $('td[data-source=forces2]').html().split('<br>')

            side2.forEach(function(element) {
                var el = element.replace(/\*?<(?:.|\n)*?>/gm, '').trim().replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&");

                if(el != "") {

                    battleItem.forcesTwo.push(el);
                }
            });
        }

        battleItem.casualties = []

        if($('td[data-source=casual1]').html() != null) {

            var side1 = $('td[data-source=casual1]').html().split('<br>')

            side1.forEach(function(element) {
                var el = element.replace(/\*?<(?:.|\n)*?>/gm, '').trim().replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&");

                if(el != "") {

                    battleItem.casualties.push(el);
                }
            });
        }
        


        if($('td[data-source=casual2]').html() != null) {
            var side2 = $('td[data-source=casual2]').html().split('<br>')

            side2.forEach(function(element) {
                var el = element.replace(/\*?<(?:.|\n)*?>/gm, '').trim().replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&");

                if(el != "") {

                    battleItem.casualties.push(el);
                }
            });
        }
        



        // console.log(battleItem);
        

        return battleItem;
    }

    async scrapeAll() {
        let battles = await this.getAllBattlesRaw();
        let data = [];

        for(let i = 0; i < battles.length; i++) {
            console.log("started scraping ", battles[i]);
            let e = await this.scrape(battles[i]);

            // console.log(e);

            if (e)
                data.push(e);
            else
                console.log("invalid page");
        }
        
        
        return data;
    }
}


module.exports = BattleScrapper;