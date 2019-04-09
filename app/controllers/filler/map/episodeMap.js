const mongoose = require('mongoose'),
    Episode = require('../../../models/map/episode'),
    jsonfile = require('jsonfile');

class EpisodeFiller {
    constructor(policy) {
        this.POLICY_REFILL = 1;
        this.POLICY_UPDATE = 2;
        this.POLICY_SAFE_UPDATE = 3;

        this.policy = policy;
    }

    async getFile() {
        let file = __appbase + '../data/episodes.json';

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
            // start scraping episodes
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
        return await Episode.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('error in removing collection: ' + err);
            } else {
                console.log('Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(episodes) {
        console.log('formating and saving scraped data to DB... this may take a few seconds');
        episodes.map(episode => {
            let newChar = new Episode();

            for(let attr in episode) {
                newChar[attr] = episode[attr];
            }

            return newChar;
        });

        return episodes;
    }

    async insertAll(data) {
        // clear collection
        if(this.policy === this.POLICY_REFILL)
        {
            await this.clearAll();
        }

        try {
            return await Episode.insertMany(data, (err, docs) => {
                if (err) {
                    console.warn('error in saving to db: ' + err);
                    return;
                }
                console.log(docs.length + ' episodes successfully saved to MongoDB!');
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = EpisodeFiller;