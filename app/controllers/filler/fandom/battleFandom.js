const mongoose = require('mongoose'),
      Battles = require('../../../models/fandom/battle'),
      BattleScraper = require('../../scraper/fandom/battle');


class BattleFandomFiller {
    constructor() {
        this.scraper = new BattleScraper();
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
        await Battles.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('error in removing collection: ' + err);
            } else {
                console.log('Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(battles) {
        console.log('formating and saving scraped data to DB... this may take a few seconds');
        battles.map(battle => {
            let newEp = new Battles();
            for(let attr in battle) {
                // numbers sometimes return NaN which throws error in DB
                if((attr == 'dateOfBattle') && isNaN(battle[attr])) {
                    delete battle[attr];
                    continue;
                } 
                newEp[attr] = battle[attr];
            }
            return newEp;
        });

        
        return battles.filter(battle => battle['name']);
    }

    async insertToDb(data) {
        await Battles.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('error in saving to db: ' + err);
                return;
            } 
            console.log(docs.length + ' battles successfully saved to MongoDB!');
        });
    }
}
module.exports = BattleFandomFiller;
