const mongoose = require('mongoose');
const Bastard = require('../../models/fandom/bastard');
const BastardScraper = require('../../scrapers/fandom/bastard');


class BastardFandomFiller {
    constructor(policy) {
        this.policy = policy;
        this.scraper = new BastardScraper();
    }

    async fill() {
        try {
            // start scraping
            let data = await this.scraper.getAllBastards();
            // clear collection
            await this.clearAll();
            // match scraped data to model
            data = await this.matchToModel(data);
            // add to DB
            await this.insertToDb(data);
        } catch(error) {
            console.warn('[FandomBastardFiller] '.green + error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[FandomBastardFiller] '.green + 'clearing collection...');
        await Bastard.deleteMany({}, (err, data) => {
            if(err) {
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
            let newBastard = new Bastard();
            for(let attr in bastard) {
                newBastard[attr] = bastard[attr];
            }
            return newBastard;
        });


        return bastards.filter(bastard => bastard['name']);
    }

    async insertToDb(data) {
        if(this.policy === FILLER_POLICY_REFILL) {
            await this.clearAll();
        }

        await Bastard.insertMany(data, (err, docs) => {
            if(err) {
                console.warn('[FandomBastardFiller] '.green + 'error in saving to db: ' + err);
                return;
            }
            console.log('[FandomBastardFiller] '.green + docs.length + ' bastards successfully saved to MongoDB!');
        });
    }
}

module.exports = BastardFandomFiller;
