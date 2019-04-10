const mongoose = require('mongoose');
const Cities = require('../../../models/westeros/city');
const jsonfile = require('jsonfile');

class CityFiller {
    constructor(policy) {
        this.policy = policy;
    }

    async getFile() {
        let file = __appbase + '../data/cities.json';

        return new Promise(function (resolve, reject) {
            jsonfile.readFile(file, function(err, obj) {
                if(err) {
                    return reject();
                }

                console.log('[WesterosCityFiller] '.green + 'Cities from  file "'+file+'". No scrapping.');

                let result = obj.filter(function(item, pos) {
                    for(let i = 0; i < obj.length; i++) {
                        if(i === pos) {
                            break;
                        }

                        if(obj[i]["name"] === item["name"])
                        {
                            return false;
                        }
                    }

                    return true;
                });

                resolve(result);
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
        console.log('[WesterosCityFiller] '.green + 'clearing collection...');
        return await Cities.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[WesterosCityFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[WesterosCityFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(events) {
        console.log('[WesterosCityFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        events.map(event => {
            let newChar = new Cities();

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
        if(this.policy === FILLER_POLICY_REFILL)
        {
            await this.clearAll();
        }

        try {
            return await Cities.insertMany(data, (err, docs) => {
                if (err) {
                    console.warn('[WesterosCityFiller] '.green + 'error in saving to db: ' + err);
                    return;
                }
                console.log('[WesterosCityFiller] '.green + docs.length + ' cities successfully saved to MongoDB!');
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = CityFiller;