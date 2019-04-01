const mongoose = require('mongoose'),
      Events = require('../../../models/fandom/event'),
      EventScraper = require('../../scraper/fandom/event');


class EventFandomFiller {
    constructor() {
        this.scraper = new EventScraper();
    }

    async fill() {
        try {
            // start scraping
            let data = await this.scraper.scrapeAll();
            // clear collection
            await this.clearAll();
            // match scraped data to model
            data = await this.matchToModel(data);

            console.log(data.length);
            // add to DB
            await this.insertToDb(data);
        } catch (error) {
            console.warn(error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('clearing collection...')
        Events.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('error in removing collection: ' + err);
            } else {
                console.log('Collection successfully removed');
            }
        });
        return;
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(events) {
        console.log('formating and saving scraped data to DB... this may take a few seconds');
        events.map(event => {
            let newChar = new Events();
            for(let attr in event) {
                // numbers sometimes return NaN which throws error in DB
                if((attr == 'dateOfEvent') && isNaN(event[attr])) {
                    delete event[attr];
                } 
                newChar[attr] = event[attr];
            }
            return newChar;
        });
        return events.filter(event => event['name']);
    }

    async insertToDb(data) {
        Events.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('error in saving to db: ' + err);
                return;
            } 
            console.log(docs.length + ' events successfully saved to MongoDB!');
        });
        return;
    }
}
module.exports = EventFandomFiller;
