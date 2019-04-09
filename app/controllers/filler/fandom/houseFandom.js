const mongoose = require('mongoose'),
      Houses = require('../../../models/fandom/house'),
      HouseScrapper = require('../../scraper/fandom/house');


class HouseFandomFiller {
    constructor() {
        this.scraper = new HouseScrapper();
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
        console.log('clearing collection...')
        await Houses.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('error in removing collection: ' + err);
            } else {
                console.log('Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(houses) {
        console.log('formating and saving scraped data to DB... this may take a few seconds');
        houses.map(house => {
            let newHouse = new Houses();
            for (let attr in house) {
                newHouse[attr] = house[attr];
            }
            return newHouse;
        });

        
        return houses.filter(house => house['name']);
    }

    async insertToDb(data) {
        await Houses.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('error in saving to db: ' + err);
                return;
            } 
            console.log(docs.length + ' houses successfully saved to MongoDB!');
        });
    }
}
module.exports = HouseFandomFiller;