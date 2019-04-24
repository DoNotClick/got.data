const mongoose = require('mongoose');
const Events = require('../../models/fandom/event');
const EventScraper = require('../../scrapers/fandom/event');


class EventFandomFiller {
    constructor(policy) {
        this.scraper = new EventScraper();
        this.policy = policy;
    }

    async fill() {
        try {
            // start scraping
            let data = await this.scraper.scrapeAll();
            // clear collection
            await this.clearAll();
            // match scraped data to model
            data = await this.matchToModel(data);

            // add to DB
            await this.insertToDb(data);
        } catch(error) {
            console.warn('[FandomEventFiller] '.green + error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[FandomEventFiller] '.green + 'clearing collection...');
        await Events.deleteMany({}, (err, data) => {
            if(err) {
                console.warn('[FandomEventFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[FandomEventFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(events) {
        console.log('[FandomEventFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        events.map(event => {
            let newEvent = new Events();
            for(let attr in event) {
                // numbers sometimes return NaN which throws error in DB
                if((attr == 'dateOfEvent') && isNaN(event[attr])) {
                    delete event[attr];
                }
                newEvent[attr] = event[attr];
            }
            return newEvent;
        });
        return events.filter(event => event['name']);
    }

    async insertToDb(data) {
        if(this.policy === FILLER_POLICY_REFILL) {
            await this.clearAll();
        }

        await Events.insertMany(data, (err, docs) => {
            if(err) {
                console.warn('[FandomEventFiller] '.green + 'error in saving to db: ' + err);
                return;
            }
            console.log('[FandomEventFiller] '.green + docs.length + ' events successfully saved to MongoDB!');
        });
    }
}

module.exports = EventFandomFiller;
