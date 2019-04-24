const mongoose = require('mongoose');
const Cultures = require('../../models/westeros/culture');
const CultureScraper = require('../../scrapers/westeros/culture');


class CulturesFiller {
    constructor(policy) {
        this.scraper = new CultureScraper();
        this.policy = policy;
    }

    async fill() {
        try {
            // start scraping characters
            let data = await this.scraper.getAll();
            // match scraped data to model
            data = await this.matchToModel(data);
            // add to DB
            await this.insertAll(data);
        } catch(error) {
            throw new Error(error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[WesterosCultureFiller] '.green + 'clearing collection...');
        return await Cultures.deleteMany({}, (err, data) => {
            if(err) {
                console.warn('[WesterosCultureFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[WesterosCultureFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(cultures) {
        console.log('[WesterosCultureFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        cultures.map(culture => {
            let newChar = new Cultures();

            for(let attr in culture) {
                newChar[attr] = culture[attr];
            }

            return newChar;
        });

        return cultures;
    }

    async insertAll(data) {
        // clear collection
        if(this.policy === FILLER_POLICY_REFILL) {
            await this.clearAll();
        }

        try {
            return await Cultures.insertMany(data, (err, docs) => {
                if(err) {
                    console.warn('[WesterosCultureFiller] '.green + 'error in saving to db: ' + err);
                    return;
                }
                console.log('[WesterosCultureFiller] '.green + docs.length + ' cultures successfully saved to MongoDB!');
            });
        } catch(error) {
            throw new Error(error);
        }
    }
}

module.exports = CulturesFiller;