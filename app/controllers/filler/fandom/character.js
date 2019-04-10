const mongoose = require('mongoose');
const Characters = require('../../../models/fandom/character');
const CharacterScraper = require('../../scraper/fandom/character');

class CharacterFandomFiller {
    constructor(policy) {
        this.policy = policy;
        this.scraper = new CharacterScraper();
    }

    async fill() {
        try {
            // start scraping characters
            let data = await this.scraper.scrapeAll();
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
        console.log('[FandomCharacterFiller] '.green + 'clearing collection...')
        return await Characters.deleteMany({}).exec((err, data) => {
            if (err) {
                console.warn('[FandomCharacterFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[FandomCharacterFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(characters) {
        console.log('[FandomCharacterFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        characters.map(character => {
            let newChar = new Characters();
            for(let attr in character) {
                // numbers sometimes return NaN which throws error in DB
                if((attr == 'birth' || attr == 'death' || attr == 'seasons') && isNaN(character[attr])) {
                    delete character[attr];
                } 
                newChar[attr] = character[attr];
            }
            return newChar;
        });
        return characters.filter(character => character['name'] && character['slug']);
    }

    async insertAll(data) {
        try {
            if(this.policy === FILLER_POLICY_REFILL) {
                console.log('[FandomCharacterFiller] '.green + 'starting whole refill')
                await this.clearAll();
                await this.fillCollection(data);
            }
            else if (this.policy === FILLER_POLICY_UPDATE) {
                console.log('[FandomCharacterFiller] '.green + 'starting update');
                await this.updateCollection(data);
            } else {
                console.log('[FandomCharacterFiller] '.green + 'starting safe update');
                this.safeUpdateCollection(data)
            }
            
        } catch (error) {
            throw new Error(error);
        }
    }


    async updateCollection(data) {
        try {
            const bulkOps = data.map(obj => ({
                updateOne: {
                    filter: { slug: obj.slug },
                    update: { $set: obj },
                    upsert: true
                }
            }));
            return await Characters.collection.bulkWrite(bulkOps, (err, res) => {
                    if (err) throw new Error(err);
                    console.log('[FandomCharacterFiller] '.green + res.upsertedCount + ' documents newly created.\n' + res.matchedCount + ' documents updated');
                });
        } catch (e) {
            throw new Error(e);
        }
    }

    async safeUpdateCollection(data) {
        try {
            let promises = data.map(async (obj) => {
                await Characters.find({ slug: obj.slug }).exec(async (err, slugdocs) => {
                    if (err) throw new Error(err);
                    if (slugdocs.length === 0) {
                        await Characters.find({ name: obj.name }).exec((err, namedocs) => {
                            if (namedocs.length === 0) {
                                let newChar = new Characters(obj);
                                newChar.save((err) => {
                                    if (err) throw new Error(err);
                                    console.log('[FandomCharacterFiller] '.green + obj.slug + ' successfully added to DB');
                                })
                            } else {
                                Characters.updateOne({name: obj.name}, {$set: obj}, (err, res) => {
                                    if (err) throw new Error(err);
                                });
                            }
                        });
                    }
                });
            });
            return await Promise.all(promises);
        } catch (e) {
            throw new Error(e);
        }
    }


    async fillCollection(data) {
        try {
            return await Characters.insertMany(data, (err, docs) => {
                if (err) {
                    console.warn('[FandomCharacterFiller] '.green + 'error in saving to db: ' + err);
                    return;
                } 
                console.log('[FandomCharacterFiller] '.green + docs.length + ' characters successfully saved to MongoDB!');
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = CharacterFandomFiller;
