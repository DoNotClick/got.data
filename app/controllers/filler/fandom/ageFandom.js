const mongoose = require('mongoose'),
      Ages = require('../../../models/fandom/age'),
      AgeScrapper = require('../../scraper/fandom/age');


class AgeFandomFiller {
    constructor() {
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

            // console.log(data.length);
            // add to DB
            await this.insertToDb(data);
        } catch (error) {
            console.warn(error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('clearing collection...');
        await Ages.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('error in removing collection: ' + err);
            } else {
                console.log('Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(ages) {
        console.log('formating and saving scraped data to DB... this may take a few seconds');
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
        await Ages.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('error in saving to db: ' + err);
                return;
            } 
            console.log(docs.length + ' ages successfully saved to MongoDB!');
        });
    }
}
module.exports = AgeFandomFiller;
