const mongoose = require('mongoose'),
    Continents = require('../../../models/westeros/continent'),
    jsonfile = require('jsonfile');

class ContinentsFiller {
    constructor(policy) {
        this.POLICY_REFILL = 1;
        this.POLICY_UPDATE = 2;
        this.POLICY_SAFE_UPDATE = 3;

        this.policy = policy;
    }
    
    async getFile() {
        let file = __appbase + '../data/continents.json';

        return new Promise(function (resolve, reject) {
            jsonfile.readFile(file, function(err, obj) {
                if(err) {
                    return reject();
                }

                console.log('Cities from  file "'+file+'". Now scrapping.');

                resolve(obj);
            });
        });
    }

    async fill() {
        try {
            // start scraping characters
            let data = await this.getFile();
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
        return await Continents.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('error in removing collection: ' + err);
            } else {
                console.log('Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(events) {
        console.log('formating and saving scraped data to DB... this may take a few seconds');
        events.map(event => {
            let newChar = new Continents();

            for(let attr in event) {
                // remove spaces and html tags
                if (typeof event[attr] == 'string') {
                    event[attr] = event[attr].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
                }

                newChar[attr] = event[attr];
            }

            return newChar;
        });

        return events;
    }

    async insertAll(data) {
        // clear collection
        if(this.policy === this.POLICY_REFILL)
        {
            await this.clearAll();
        }

        try {
            return await Continents.insertMany(data, (err, docs) => {
                if (err) {
                    console.warn('error in saving to db: ' + err);
                    return;
                }
                console.log(docs.length + ' events successfully saved to MongoDB!');
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = ContinentsFiller;