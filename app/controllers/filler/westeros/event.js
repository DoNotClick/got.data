const mongoose = require('mongoose'),
    Events = require('../../../models/westeros/event'),
    EventScraper = require('../../../controllers/scraper/westeros/events');


class EventsFiller {
    constructor(policy) {
        this.POLICY_REFILL = 1;
        this.POLICY_UPDATE = 2;
        this.POLICY_SAFE_UPDATE = 3;

        this.scraper = new EventScraper();
        this.policy = policy;
    }

    async fill() {
        try {
            // start scraping characters
            let data = await this.scraper.getAll();
            // match scraped data to model
            data = await this.matchToModel(data);
            // add to DB
            await this.insertAll(data);
        } catch (error) {
            throw new Error(error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[WesterosEventFiller] '.green + 'clearing collection...');
        return await Events.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[WesterosEventFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[WesterosEventFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(events) {

        console.log('[WesterosEventFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        events.map(event => {
            let newChar = new Events();

            for(let attr in event) {
                // remove spaces and html tags
                if (typeof event[attr] == 'string') {
                    event[attr] = event[attr].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
                }
                // translate date to a number
                if (attr === 'date') {
                    if (typeof event[attr] === "string" && (event[attr].indexOf('AC') > -1 || event[attr].indexOf('ac') > -1)) {
                        event[attr] = Math.abs(event[attr].replace(/\D/g, ''));
                    }
                    else if (typeof event[attr] === "string" && (event[attr].indexOf('BC') > -1 || event[attr].indexOf('bc') > -1)) {
                        event[attr] = 0 - Math.abs(event[attr].replace(/\D/g, ''));
                    }
                    else {
                        delete event[attr]; // ignore it for now
                    }
                }

                newChar[attr] = event[attr];
            }

            return newChar;
        });

        return events;
    }

    async insertAll(data) {
        // clear collection
        if(this.policy === this.POLICY_REFILL)
        {
            await this.clearAll();
        }

        try {
            return await Events.insertMany(data, (err, docs) => {
                if (err) {
                    console.warn('[WesterosEventFiller] '.green + 'error in saving to db: ' + err);
                    return;
                }
                console.log('[WesterosEventFiller] '.green + docs.length + ' events successfully saved to MongoDB!');
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = EventsFiller;