const mongoose = require('mongoose');
const Towns = require('../../models/fandom/town');
const TownScraper = require('../../scrapers/fandom/town');


class TownFandomFiller {
    constructor(policy) {
        this.scraper = new TownScraper();
        this.policy = policy;
    }

    async fill() {
        try {
            // start scraping
            let data = await this.scraper.scrapeAll();
            // clear collection
            await this.clearAll();
            // match scraped data to model
            data = await this.matchToModel(data);
            // add to DB
            await this.insertToDb(data);
        } catch(error) {
            console.warn('[FandomTownFiller] '.green + error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[FandomTownFiller] '.green + 'clearing collection...');
        return await Towns.deleteMany({}, (err, data) => {
            if(err) {
                console.warn('[FandomTownFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[FandomTownFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(towns) {
        console.log('[FandomTownFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
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
        if(this.policy === FILLER_POLICY_REFILL) {
            await this.clearAll();
        }

        await Towns.insertMany(data, (err, docs) => {
            if(err) {
                console.warn('[FandomTownFiller] '.green + 'error in saving to db: ' + err);
                return;
            }
            console.log('[FandomTownFiller] '.green + docs.length + ' towns successfully saved to MongoDB!');
        });
    }
}

module.exports = TownFandomFiller;
