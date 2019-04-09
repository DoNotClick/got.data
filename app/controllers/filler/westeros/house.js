const mongoose = require('mongoose'),
    Houses = require('../../../models/westeros/house'),
    HouseScraper = require('../../../controllers/scraper/westeros/houses');


class HousesFiller {
    constructor(policy) {
        this.POLICY_REFILL = 1;
        this.POLICY_UPDATE = 2;
        this.POLICY_SAFE_UPDATE = 3;

        this.scraper = new HouseScraper();
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
        console.log('[WesterosHouseFiller] '.green + 'clearing collection...');
        return await Houses.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[WesterosHouseFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[WesterosHouseFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(houses) {
        console.log('[WesterosHouseFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        houses.map(house => {
            let newChar = new Houses();

            for(let attr in house) {
                // remove spaces and html tags
                if (typeof house[attr] == 'string') {
                    house[attr] = house[attr].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
                }

                newChar[attr] = house[attr];
            }

            return newChar;
        });

        return houses;
    }

    async insertAll(data) {
        // clear collection
        if(this.policy === this.POLICY_REFILL)
        {
            await this.clearAll();
        }

        try {
            return await Houses.insertMany(data, (err, docs) => {
                if (err) {
                    console.warn('[WesterosHouseFiller] '.green + 'error in saving to db: ' + err);
                    return;
                }
                console.log('[WesterosHouseFiller] '.green + docs.length + ' houses successfully saved to MongoDB!');
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = HousesFiller;