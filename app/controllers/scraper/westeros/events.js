const MWBot = require('mwbot');
const cheerio = require('cheerio');

const AgesScraper = require("./ages");

class EventScraper {
    constructor()
    {
        this.bot = new MWBot({
            apiUrl: 'https://awoiaf.westeros.org/api.php'
        });

        this.agesScraper = new AgesScraper();
    }

    async getAll()
    {
        console.log('scraping westeros events...')
        let events = [];
        let ages = await this.agesScraper.getAllWithEvents();

        for (let i = 0; i < ages.length; i++) {
            for (let j = 0; j < ages[i].events.length; j++) {
                let event = ages[i].events[j];
                event.age = ages[i].name;
                events.push(event);
            }
        }

        return events;
    }
}

module.exports = EventScraper;