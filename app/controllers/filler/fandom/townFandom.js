const mongoose = require('mongoose'),
      Towns = require('../../../models/fandom/town'),
      TownScraper = require('../../scraper/fandom/town');


class TownFandomFiller {
    constructor() {
        this.scraper = new TownScraper();
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
        return await Towns.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('error in removing collection: ' + err);
            } else {
                console.log('Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(towns) {
        console.log('formating and saving scraped data to DB... this may take a few seconds');
        towns.map(town => {
            let newEp = new Towns();
            for(let attr in town) {
                
                newEp[attr] = town[attr];
            }
            return newEp;
        });

        
        return towns.filter(town => town['name']);
    }

    async insertToDb(data) {
        await Towns.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('error in saving to db: ' + err);
                return;
            } 
            console.log(docs.length + ' towns successfully saved to MongoDB!');
        });
    }
}
module.exports = TownFandomFiller;
