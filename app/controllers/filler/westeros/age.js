const mongoose = require('mongoose');
const Ages = require('../../../models/westeros/age');
const AgesScraper = require('../../scraper/westeros/age');


class AgesFiller {
    constructor(policy) {
        this.scraper = new AgesScraper();
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
        console.log('[WesterosAgeFiller] '.green + 'clearing collection...');
        return await Ages.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[WesterosAgeFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[WesterosAgeFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(ages) {
        console.log('[WesterosAgeFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        ages.map(age => {
            let newChar = new Ages();

            for(let attr in age) {
                // translate startDate to (negative) number
                if(attr === 'startDate') {
                    if(age[attr].indexOf('BC')>-1) {
                        age[attr] = 0 - age[attr].replace(/[^0-9\.]/g, '');
                    }
                    else if(age[attr].indexOf('AC')>-1) {
                        age[attr] = age[attr].replace(/[^0-9\.]/g, '');
                    }
                    else if(age[attr].indexOf('ca')>-1) {
                        age[attr] = age[attr].replace('ca.','').replace(',','');
                    }
                    else {
                        delete age[attr];
                    }
                }

                // translate startDate to (negative) number
                if(attr === 'endDate') {
                    if(age[attr].indexOf('BC')>-1) {
                        age[attr] = 0 - age[attr].replace(/[^0-9\.]/g, '');
                    }
                    else if(age[attr].indexOf('282-283 AC')>-1) { //hardcoded =/
                        age[attr] = 283;
                    }
                    else if(age[attr].indexOf('AC')>-1) {
                        age[attr] = age[attr].replace(/[^0-9\.]/g, '');
                    }
                    else if(age[attr].indexOf('~')>-1) {
                        age[attr] = age[attr].replace('~', '');
                    }
                    else if(age[attr].indexOf('ca')>-1) {
                        age[attr] = age[attr].replace('ca.','').replace(',','').replace(' ','');
                    }
                    else {
                        delete age[attr];
                    }
                }

                // remove spaces and html tags
                if (typeof age[attr] == 'string') {
                    age[attr] = age[attr].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
                }

                newChar[attr] = age[attr];
            }

            return newChar;
        });

        return ages;
    }

    async insertAll(data) {
        // clear collection
        if(this.policy === FILLER_POLICY_REFILL)
        {
            await this.clearAll();
        }

        try {
            return await Ages.insertMany(data, (err, docs) => {
                if (err) {
                    console.warn('[WesterosAgeFiller] '.green + 'error in saving to db: ' + err);
                    return;
                }
                console.log('[WesterosAgeFiller] '.green + docs.length + ' ages successfully saved to MongoDB!');
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = AgesFiller;