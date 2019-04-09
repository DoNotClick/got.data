const mongoose = require('mongoose'),
    CharacterPath = require('../../../models/westeros/characterPath'),
    jsonfile = require('jsonfile');

class CityFiller {
    constructor(policy) {
        this.POLICY_REFILL = 1;
        this.POLICY_UPDATE = 2;
        this.POLICY_SAFE_UPDATE = 3;

        this.policy = policy;
    }

    async getFile() {
        let file = __appbase + '../data/characterPaths.json';

        return new Promise(function (resolve, reject) {
            jsonfile.readFile(file, function(err, obj) {
                if(err) {
                    return reject();
                }

                console.log('[WesterosCharacterPathFiller] '.green + 'character path from  file "'+file+'". No scrapping.');

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
        console.log('[WesterosCharacterPathFiller] '.green + 'clearing collection...');
        return await CharacterPath.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[WesterosCharacterPathFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[WesterosCharacterPathFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(events) {
        console.log('[WesterosCharacterPathFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        events.map(event => {
            let newChar = new CharacterPath();

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
            return await CharacterPath.insertMany(data, (err, docs) => {
                if (err) {
                    console.warn('[WesterosCharacterPathFiller] '.green + 'error in saving to db: ' + err);
                    return;
                }
                console.log('[WesterosCharacterPathFiller] '.green + docs.length + ' character paths successfully saved to MongoDB!');
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = CityFiller;