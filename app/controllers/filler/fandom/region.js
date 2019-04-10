const mongoose = require('mongoose');
const Regions = require('../../../models/fandom/region');
const RegionScrapper = require('../../scraper/fandom/region');

class RegionFandomFiller {
    constructor(policy) {
        this.scraper = new RegionScrapper();
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
            console.warn('[FandomRegionFiller] '.green + error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[FandomRegionFiller] '.green + 'clearing collection...');
        await Regions.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[FandomRegionFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[FandomRegionFiller] '.green + 'Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(regions) {
        console.log('[FandomRegionFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        regions.map(region => {
            let newEp = new Regions();
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

        await Regions.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('[FandomRegionFiller] '.green + 'error in saving to db: ' + err);
                return;
            } 
            console.log('[FandomRegionFiller] '.green + docs.length + ' regions successfully saved to MongoDB!');
        });
    }
}
module.exports = RegionFandomFiller;
