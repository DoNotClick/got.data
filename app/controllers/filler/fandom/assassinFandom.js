const mongoose = require('mongoose'),
      Assassins = require('../../../models/fandom/assassin'),
      AssassinsScraper = require('../../scraper/fandom/assassin');


class AssassinsFandomFiller {
    constructor() {
        this.scraper = new AssassinsScraper();
    }

    async fill() {
        try {
            // start scraping
            let data = await this.scraper.getAllAssassin();
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
        await Assassins.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('error in removing collection: ' + err);
            } else {
                console.log('Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(assassins) {
        console.log('formating and saving scraped data to DB... this may take a few seconds');
        assassins.map(assassin => {
            let newAssassin = new Assassins();
            for(let attr in assassin) {
                newAssassin[attr] = assassin[attr];
            }
            return newAssassin;
        });

        return assassins.filter(assassin => assassin['name']);
    }

    async insertToDb(data) {
        await Assassins.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('error in saving to db: ' + err);
                return;
            } 
            console.log(docs.length + ' assassins successfully saved to MongoDB!');
        });
    }
}
module.exports = AssassinsFandomFiller;
