const mongoose = require('mongoose'),
      Citys = require('../../../models/fandom/city'),
      CityScraper = require('../../scraper/fandom/city');


class CityFandomFiller {
    constructor() {
        this.scraper = new CityScraper();
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
        console.log('clearing collection...')
        await Citys.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('error in removing collection: ' + err);
            } else {
                console.log('Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(citys) {
        console.log('formating and saving scraped data to DB... this may take a few seconds');
        citys.map(city => {
            let newEp = new Citys();
            for(let attr in city) {
                
                newEp[attr] = city[attr];
            }
            return newEp;
        });

        
        return citys.filter(city => city['name']);
    }

    async insertToDb(data) {
        await Citys.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('error in saving to db: ' + err);
                return;
            } 
            console.log(docs.length + ' citys successfully saved to MongoDB!');
        });
    }
}
module.exports = CityFandomFiller;
