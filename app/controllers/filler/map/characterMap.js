const mongoose = require('mongoose'),
    Character = require('../../../models/map/character'),
    jsonfile = require('jsonfile');

class CharacterFiller {
    constructor(policy) {
        this.POLICY_REFILL = 1;
        this.POLICY_UPDATE = 2;
        this.POLICY_SAFE_UPDATE = 3;

        this.policy = policy;
    }

    async getFile() {
        let file = __appbase + '../data/characters.json';

        return new Promise(function (resolve, reject) {
            jsonfile.readFile(file, function(err, obj) {
                if(err) {
                    return reject();
                }

                console.log('Characters from  file "'+file+'". No scrapping.');

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
        return await Character.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('error in removing collection: ' + err);
            } else {
                console.log('Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(characters) {
        console.log('formating and saving scraped data to DB... this may take a few seconds');
        characters.map(character => {
            let newChar = new Character();

            for(let attr in character) {
                newChar[attr] = character[attr];
            }

            return newChar;
        });

        return characters;
    }

    async insertAll(data) {
        // clear collection
        if(this.policy === this.POLICY_REFILL)
        {
            await this.clearAll();
        }

        try {
            return await Character.insertMany(data, (err, docs) => {
                if (err) {
                    console.warn('error in saving to db: ' + err);
                    return;
                }
                console.log(docs.length + ' characters successfully saved to MongoDB!');
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = CharacterFiller;