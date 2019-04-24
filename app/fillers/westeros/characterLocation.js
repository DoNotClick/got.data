const mongoose = require('mongoose');
const CharacterLocations = require('../../models/westeros/characterLocation');
const CharacterLocationScraper = require('../../scrapers/westeros/characterLocation');


class CharacterLocationFiller {
    constructor(policy) {
        this.scraper = new CharacterLocationScraper();
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
        console.log('[WesterosCharacterLocationFiller] '.green + 'clearing collection...');
        return await CharacterLocations.deleteMany({}, (err, data) => {
            if(err) {
                console.warn('[WesterosCharacterLocationFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[WesterosCharacterLocationFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(characterLocations) {
        console.log('[WesterosCharacterLocationFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        characterLocations.map(characterLocation => {
            let newChar = new CharacterLocations();

            for(let attr in characterLocation) {
                // remove spaces and html tags
                if(typeof characterLocation[attr] == 'string') {
                    characterLocation[attr] = characterLocation[attr].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
                }

                newChar[attr] = characterLocation[attr];
            }

            return newChar;
        });

        return characterLocations;
    }

    async insertAll(data) {
        // clear collection
        if(this.policy === FILLER_POLICY_REFILL) {
            await this.clearAll();
        }

        try {
            return await CharacterLocations.insertMany(data, (err, docs) => {
                if(err) {
                    console.warn('[WesterosCharacterLocationFiller] '.green + 'error in saving to db: ' + err);
                    return;
                }
                console.log('[WesterosCharacterLocationFiller] '.green + docs.length + ' character locations successfully saved to MongoDB!');
            });
        } catch(error) {
            throw new Error(error);
        }
    }
}

module.exports = CharacterLocationFiller;