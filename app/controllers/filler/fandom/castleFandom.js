const mongoose = require('mongoose'),
      Castles = require('../../../models/fandom/castle'),
      CastleScrapper = require('../../scraper/fandom/castle');


class CastleFandomFiller {
    constructor() {
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
        await Castles.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('error in removing collection: ' + err);
            } else {
                console.log('Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(casltes) {
        console.log('formating and saving scraped data to DB... this may take a few seconds');
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
        await Castles.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('error in saving to db: ' + err);
                return;
            } 
            console.log(docs.length + ' casltes successfully saved to MongoDB!');
        });
    }
}
module.exports = CastleFandomFiller;
