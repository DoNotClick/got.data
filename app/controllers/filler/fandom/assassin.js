const mongoose = require('mongoose'),
      Assassins = require('../../../models/fandom/assassin'),
      Characters = require('../../../models/fandom/character'),
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
            console.warn('[FandomAssassinFiller] '.green + error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[FandomAssassinFiller] '.green + 'clearing collection...');
        await Assassins.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[FandomAssassinFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[FandomAssassinFiller] '.green + 'Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(assassins) {
        console.log('[FandomAssassinFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        assassins.map(async (assassin) => {
            let newAssassin = new Assassins();

            for (let attr in assassin) {
                newAssassin[attr] = assassin[attr];
            }
            return newAssassin;  
            
            // return newAssassin;
        });
        return assassins.filter(assassin => assassin['slug']);
    }

    async insertToDb(data) {
        await Assassins.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('[FandomAssassinFiller] '.green + 'error in saving to db: ' + err);
                return;
            } 
            console.log('[FandomAssassinFiller] '.green + docs.length + ' assassins successfully saved to MongoDB!');
        });
    }
}
module.exports = AssassinsFandomFiller;
