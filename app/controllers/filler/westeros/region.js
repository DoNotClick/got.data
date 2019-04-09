const mongoose = require('mongoose'),
    Regions = require('../../../models/westeros/region'),
    RegionScraper = require('../../../controllers/scraper/westeros/regions');


class RegionsFiller {
    constructor(policy) {
        this.POLICY_REFILL = 1;
        this.POLICY_UPDATE = 2;
        this.POLICY_SAFE_UPDATE = 3;

        this.scraper = new RegionScraper();
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
        console.log('[WesterosRegionFiller] '.green + 'clearing collection...');
        return Regions.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[WesterosRegionFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[WesterosRegionFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(regions) {
        console.log('[WesterosRegionFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        regions.map(region => {
            let newChar = new Regions();

            for(let attr in region) {
                // remove spaces and html tags
                if (typeof region[attr] == 'string') {
                    region[attr] = region[attr].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
                }

                newChar[attr] = region[attr];
            }

            return newChar;
        });

        return regions;
    }

    async insertAll(data) {
        // clear collection
        if(this.policy === this.POLICY_REFILL)
        {
            await this.clearAll();
        }

        try {
            return await Regions.insertMany(data, (err, docs) => {
                if (err) {
                    console.warn('[WesterosRegionFiller] '.green + 'error in saving to db: ' + err);
                    return;
                }
                console.log('[WesterosRegionFiller] '.green + docs.length + ' houses successfully saved to MongoDB!');
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = RegionsFiller;