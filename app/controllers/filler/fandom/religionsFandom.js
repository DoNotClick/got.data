const mongoose = require('mongoose'),
      Religions = require('../../../models/fandom/religions'),
      ReligionScrapper = require('../../scraper/fandom/religions');


class ReligionFandomFiller {
    constructor() {
        this.scraper = new ReligionScrapper();
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
        console.log('clearing collection...');
        await Religions.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('error in removing collection: ' + err);
            } else {
                console.log('Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(regions) {
        console.log('formating and saving scraped data to DB... this may take a few seconds');
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
        await Religions.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('error in saving to db: ' + err);
                return;
            } 
            console.log(docs.length + ' regions successfully saved to MongoDB!');
        });
    }
}
module.exports = ReligionFandomFiller;
