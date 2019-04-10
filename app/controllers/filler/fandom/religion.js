const mongoose = require('mongoose');
const Religions = require('../../../models/fandom/religion');
const ReligionScrapper = require('../../scraper/fandom/religion');

class ReligionFandomFiller {
    constructor(policy) {
        this.scraper = new ReligionScrapper();
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
        } catch (error) {
            console.warn('[FandomReligionFiller] '.green + error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[FandomReligionFiller] '.green + 'clearing collection...');
        await Religions.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[FandomReligionFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[FandomReligionFiller] '.green + 'Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(regions) {
        console.log('[FandomReligionFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        regions.map(region => {
            let newEp = new Religions();
            for(let attr in region) {
                // numbers sometimes return NaN which throws error in DB
                if((attr == 'age') && isNaN(region[attr])) {
                    delete region[attr];
                    continue;
                } 
                newEp[attr] = region[attr];
            }
            return newEp;
        });

        
        return regions.filter(region => region['name']);
    }

    async insertToDb(data) {
        if(this.policy === FILLER_POLICY_REFILL)
        {
            await this.clearAll();
        }

        await Religions.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('[FandomReligionFiller] '.green + 'error in saving to db: ' + err);
                return;
            } 
            console.log('[FandomReligionFiller] '.green + docs.length + ' regions successfully saved to MongoDB!');
        });
    }
}
module.exports = ReligionFandomFiller;
