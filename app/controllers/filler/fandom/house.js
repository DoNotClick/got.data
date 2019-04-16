const mongoose = require('mongoose');
const Houses = require('../../../models/fandom/house');
const HouseScrapper = require('../../scraper/fandom/house');


class HouseFandomFiller {
    constructor(policy) {
        this.scraper = new HouseScrapper();
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
            console.warn('[FandomHouseFiller] '.green + error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[FandomHouseFiller] '.green + 'clearing collection...');
        await Houses.deleteMany({}, (err, data) => {
            if(err) {
                console.warn('[FandomHouseFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[FandomHouseFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(houses) {
        console.log('[FandomHouseFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        houses.map(house => {
            let newHouse = new Houses();
            for(let attr in house) {
                newHouse[attr] = house[attr];
            }
            return newHouse;
        });


        return houses.filter(house => house['name']);
    }

    async insertToDb(data) {
        if(this.policy === FILLER_POLICY_REFILL) {
            await this.clearAll();
        }

        await Houses.insertMany(data, (err, docs) => {
            if(err) {
                console.warn('[FandomHouseFiller] '.green + 'error in saving to db: ' + err);
                return;
            }
            console.log('[FandomHouseFiller] '.green + docs.length + ' houses successfully saved to MongoDB!');
        });
    }
}

module.exports = HouseFandomFiller;