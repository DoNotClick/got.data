const mongoose = require('mongoose'),
    Cultures = require('../../../models/westeros/culture'),
    CultureScraper = require('../../../controllers/scraper/westeros/cultures');


class CulturesFiller {
    constructor(policy) {
        this.POLICY_REFILL = 1;
        this.POLICY_UPDATE = 2;
        this.POLICY_SAFE_UPDATE = 3;

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
        } catch (error) {
            throw new Error(error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('clearing collection...');
        return await Cultures.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('error in removing collection: ' + err);
            } else {
                console.log('Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(cultures) {
        console.log('formating and saving scraped data to DB... this may take a few seconds');
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
        if(this.policy === this.POLICY_REFILL)
        {
            await this.clearAll();
        }

        try {
            return await Cultures.insertMany(data, (err, docs) => {
                if (err) {
                    console.warn('error in saving to db: ' + err);
                    return;
                }
                console.log(docs.length + ' cultures successfully saved to MongoDB!');
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = CulturesFiller;