const mongoose = require('mongoose');
const Region = require('../../../models/map/region');
const jsonfile = require('jsonfile');

class RegionFiller {
    constructor(policy) {
        this.policy = policy;
    }

    async getFile() {
        let file = __appbase + '../data/regions.json';

        return new Promise(function (resolve, reject) {
            jsonfile.readFile(file, function(err, obj) {
                if(err) {
                    return reject();
                }

                console.log('[MapRegionFiller] '.green + 'Regions from  file "'+file+'". No scrapping.');

                resolve(obj);
            });
        });
    }

    async fill() {
        try {
            // start scraping regions
            let data = await this.getFile();
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
        console.log('[MapRegionFiller] '.green + 'clearing collection...');
        return await Region.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[MapRegionFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[MapRegionFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(regions) {
        console.log('[MapRegionFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        regions.map(region => {
            let newChar = new Region();

            for(let attr in region) {
                newChar[attr] = region[attr];
            }

            return newChar;
        });

        return regions;
    }

    async insertAll(data) {
        // clear collection
        if(this.policy === FILLER_POLICY_REFILL)
        {
            await this.clearAll();
        }

        try {
            return await Region.insertMany(data, (err, docs) => {
                if (err) {
                    console.warn('[MapRegionFiller] '.green + 'error in saving to db: ' + err);
                    return;
                }
                console.log('[MapRegionFiller] '.green + docs.length + ' regions successfully saved to MongoDB!');
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = RegionFiller;