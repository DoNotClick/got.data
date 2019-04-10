const mongoose = require('mongoose');
const Castles = require('../../../models/fandom/castle');
const CastleScrapper = require('../../scraper/fandom/castle');


class CastleFandomFiller {
    constructor(policy) {
        this.policy = policy;
        this.scraper = new CastleScrapper();
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
            console.warn('[FandomCastleFiller] '.green + error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[FandomCastleFiller] '.green + 'clearing collection...');
        await Castles.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[FandomCastleFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[FandomCastleFiller] '.green + 'Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(casltes) {
        console.log('[FandomCastleFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        casltes.map(castle => {
            let newEp = new Castles();
            for(let attr in castle) {
                // numbers sometimes return NaN which throws error in DB
                if((attr == 'age') && isNaN(castle[attr])) {
                    delete castle[attr];
                    continue;
                } 
                newEp[attr] = castle[attr];
            }
            return newEp;
        });

        
        return casltes.filter(castle => castle['name']);
    }

    async insertToDb(data) {
        if(this.policy === FILLER_POLICY_REFILL)
        {
            await this.clearAll();
        }

        await Castles.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('[FandomCastleFiller] '.green + 'error in saving to db: ' + err);
                return;
            } 
            console.log('[FandomCastleFiller] '.green + docs.length + ' casltes successfully saved to MongoDB!');
        });
    }
}
module.exports = CastleFandomFiller;
