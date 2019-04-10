const MWBot = require('mwbot');
const cheerio = require('cheerio');
const rp = require('request-promise');

class EventScraper {

    constructor() {
        this.bot = new MWBot({
            apiUrl: FANDOM_API_URL
        });
    }

    async getAllEventsRaw() {

        var options = {
            uri: 'https://gameofthrones.fandom.com/wiki/Category:Events',
            transform: function (body) {
                return cheerio.load(body);
            }
        };

        var events = []
        await rp(options)
            .then(function ($) {
                // Process html like you would with jQuery...
                
                $('li[class=category-page__member]').each(function( index ) {
                    let event = {"title": null, "reference": null};
                    event.title = $(this).children('a').attr('title')
                    event.reference = $(this).children('a').attr('href')

                    if(!event.title.match(/Category/g)) {
                        events.push(event);
                    }
                  
                });

            })
            .catch(function (err) {
            });


            return events;

    }

    async scrape(event) {
        let data = null;
        try {
            data = await this.bot.request({
                action: "parse",
                format: "json",
                page: decodeURIComponent(event.reference.substr(6))
            });
        } catch (err) {
            return false;
        }

        var eventItem = {};

        eventItem.name = event.title;
        eventItem.slug = event.reference.substr(6);

        const $ = cheerio.load(data["parse"]["text"]["*"]);

        let $infobox = $(".portable-infobox");

        if($('div[data-source=conflict]') != null) {
            eventItem.conflict = $('div[data-source=conflict]').find(".pi-data-value").text();
        }

        if($('div[data-source=date]') != null) {
            eventItem.dateOfEvent = parseInt($('div[data-source=date]').find(".pi-data-value").text().replace(/\D/g,''));
        }


        eventItem.place = []

        if($('div[data-source=place]') != null) {

            var place = $('div[data-source=place]').find(".pi-data-value").html()

            if(place != null) {
                place = place.match(/title="(.*?)"/g);

                if(place) {
                    place.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    eventItem.place.push(el);
                });
                }

                
            }

        }

        eventItem.factions = []

        if($('td[data-source=side1]') != null) {

            var factions = $('td[data-source=side1]').html()

            if(factions != null) {
                factions = factions.match(/title="(.*?)"/g);

                if(factions) {
                    factions.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    eventItem.factions.push(el);
                });
                }

                
            }

        }

        if($('td[data-source=side2]') != null) {

            var factions = $('td[data-source=side2]').html()

            if(factions != null) {
                factions = factions.match(/title="(.*?)"/g);

                if(factions) {
                    factions.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    eventItem.factions.push(el);
                });
                }

                
            }

        }




        eventItem.leaders = []

        if($('td[data-source=commanders1]') != null) {

            var leaders = $('td[data-source=commanders1]').html()

            if(leaders != null) {
                leaders = leaders.match(/title="(.*?)"/g);

                if(leaders) {
                    leaders.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    eventItem.leaders.push(el);
                });
                }

                
            }

        }

        if($('td[data-source=commanders2]') != null) {

            var leaders = $('td[data-source=commanders2]').html()

            if(leaders != null) {
                leaders = leaders.match(/title="(.*?)"/g);

                if(leaders) {
                    leaders.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    eventItem.leaders.push(el);
                });
                }

                
            }

        }



        eventItem.participants = []

        if($('td[data-source=participants1]') != null) {

            var participants = $('td[data-source=participants1]').html()

            if(participants != null) {
                participants = participants.match(/title="(.*?)"/g);

                if(participants) {
                    participants.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    eventItem.participants.push(el);
                });
                }

                
            }

        }

        if($('td[data-source=participants2]') != null) {

            var participants = $('td[data-source=participants2]').html()

            if(participants != null) {
                participants = participants.match(/title="(.*?)"/g);

                if(participants) {
                    participants.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    eventItem.participants.push(el);
                });
                }

                
            }

        }

        eventItem.casualties = []

        if($('td[data-source=casual1]') != null) {

            var casualties = $('td[data-source=casual1]').html()

            if(casualties != null) {

                casualties = casualties.match(/title="(.*?)"/g);

                if(casualties) {
                    casualties.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    eventItem.casualties.push(el);
                });
                }

                
            }

        }

        if($('td[data-source=casual2]') != null) {

            var casualties = $('td[data-source=casual2]').html()

            if(casualties != null) {
                casualties = casualties.match(/title="(.*?)"/g);

                if(casualties) {
                    casualties.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    eventItem.casualties.push(el);
                });
                }

                
            }

        }
        
        

        return eventItem;
    }

    async scrapeAll() {
        let events = await this.getAllEventsRaw();
        let data = [];

        for(let i = 0; i < events.length; i++) {
            console.log('[FandomEventScraper] '.green + "started scraping ", events[i]);
            let e = await this.scrape(events[i]);

            if (e)
                data.push(e);
            else
                console.warn('[FandomEventScraper] '.green + "invalid page");
        }
        
        
        return data;
    }
}

module.exports = EventScraper;

