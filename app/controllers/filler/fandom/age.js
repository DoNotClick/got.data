const mongoose = require('mongoose');
const Ages = require('../../../models/fandom/age');
const AgeScrapper = require('../../scraper/fandom/age');


class AgeFandomFiller {
    constructor(policy) {
        this.policy = policy;
        this.scraper = new AgeScrapper();
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
        } catch (error) {
            console.warn('[FandomAgeFiller] '.green + error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[FandomAgeFiller] '.green + 'clearing collection...');
        await Ages.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[FandomAgeFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[FandomAgeFiller] '.green + 'Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(ages) {
        console.log('[FandomAgeFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        ages.map(age => {
            let newAge = new Ages();
            for(let attr in age) {
                // numbers sometimes return NaN which throws error in DB
                if((attr == 'age') && isNaN(age[attr])) {
                    delete age[attr];
                    continue;
                } 
                newAge[attr] = age[attr];
            }
            return newAge;
        });

        
        return ages.filter(age => age['name']);
    }

    async insertToDb(data) {
        if(this.policy === FILLER_POLICY_REFILL)
        {
            await this.clearAll();
        }

        await Ages.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('[FandomAgeFiller] '.green + 'error in saving to db: ' + err);
                return;
            } 
            console.log('[FandomAgeFiller] '.green + docs.length + ' ages successfully saved to MongoDB!');
        });
    }
}
module.exports = AgeFandomFiller;
