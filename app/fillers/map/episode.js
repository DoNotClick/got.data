const mongoose = require('mongoose');
const Episode = require('../../models/map/episode');
const jsonfile = require('jsonfile');

class EpisodeFiller {
    constructor(policy) {
        this.policy = policy;
    }

    async getFile() {
        let file = __appbase + '../data/episodes.json';

        return new Promise(function (resolve, reject) {
            jsonfile.readFile(file, function (err, obj) {
                if(err) {
                    return reject();
                }

                console.log('[MapEpisodeFiller] '.green + 'Episodes from  file "' + file + '". No scrapping.');

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
        } catch(error) {
            throw new Error(error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[MapEpisodeFiller] '.green + 'clearing collection...');
        return await Episode.deleteMany({}, (err, data) => {
            if(err) {
                console.warn('[MapEpisodeFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[MapEpisodeFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(episodes) {
        console.log('[MapEpisodeFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
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
        if(this.policy === FILLER_POLICY_REFILL) {
            await this.clearAll();
        }

        try {
            return await Episode.insertMany(data, (err, docs) => {
                if(err) {
                    console.warn('[MapEpisodeFiller] '.green + 'error in saving to db: ' + err);
                    return;
                }
                console.log('[MapEpisodeFiller] '.green + docs.length + ' episodes successfully saved to MongoDB!');
            });
        } catch(error) {
            throw new Error(error);
        }
    }
}

module.exports = EpisodeFiller;