const mongoose = require('mongoose'),
      Bastards = require('../../../models/fandom/bastard'),
      BastardsScraper = require('../../scraper/fandom/bastard');


class BastardsFandomFiller {
    constructor() {
        this.scraper = new BastardsScraper();
    }

    async fill() {
        try {
            // start scraping
            let data = await this.scraper.getAllBastards();
            // clear collection
            await this.clearAll();
            // match scraped data to model
            data = await this.matchToModel(data);

            // console.log(data.length);
            // add to DB
            await this.insertToDb(data);
        } catch (error) {
            console.warn('[FandomBastardFiller] '.green + error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[FandomBastardFiller] '.green + 'clearing collection...');
        await Bastards.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[FandomBastardFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[FandomBastardFiller] '.green + 'Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(bastards) {
        console.log('[FandomBastardFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        bastards.map(bastard => {
            let newBastard = new Bastards();
            for(let attr in bastard) {
                newBastard[attr] = bastard[attr];
            }
            return newBastard;
        });

        
        return bastards.filter(bastard => bastard['name']);
    }

    async insertToDb(data) {
        await Bastards.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('[FandomBastardFiller] '.green + 'error in saving to db: ' + err);
                return;
            } 
            console.log('[FandomBastardFiller] '.green + docs.length + ' bastards successfully saved to MongoDB!');
        });
    }
}
module.exports = BastardsFandomFiller;
