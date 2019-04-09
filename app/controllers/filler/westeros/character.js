const mongoose = require('mongoose'),
    Characters = require('../../../models/westeros/character'),
    CharacterScraper = require('../../../controllers/scraper/westeros/characters');


class CharacterFiller {
    constructor(policy) {
        this.POLICY_REFILL = 1;
        this.POLICY_UPDATE = 2;
        this.POLICY_SAFE_UPDATE = 3;

        this.scraper = new CharacterScraper();
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
        console.log('[WesterosCharacterFiller] '.green + 'clearing collection...');
        return await Characters.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[WesterosCharacterFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[WesterosCharacterFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(characters) {
        console.log('[WesterosCharacterFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        characters.map(character => {
            let newChar = new Characters();

            for(let attr in character) {
                // remove spaces and html tags
                if (typeof character[attr] == 'string') {
                    character[attr] = character[attr].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
                }
                if((attr == 'birth' || attr == 'death') && isNaN(character[attr])) {
                    delete character[attr];
                    continue;
                } 
                newChar[attr] = character[attr];
            }

            return newChar;
        });

        return characters;
    }

    async insertAll(data) {
        try {
            if(this.policy === this.POLICY_REFILL) {
                console.log('[WesterosCharacterFiller] '.green + 'starting whole refill')
                await this.clearAll();
                await this.fillCollection(data);
            }
            else if (this.policy === this.POLICY_UPDATE) {
                console.log('[WesterosCharacterFiller] '.green + 'starting update');
                await this.updateCollection(data);
            } else {
                console.log('[WesterosCharacterFiller] '.green + 'starting safe update');
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
                    console.log('[WesterosCharacterFiller] '.green + res.upsertedCount + ' documents newly created.\n' + res.matchedCount + ' documents updated');
                });
        } catch (e) {
            throw new Error(e);
        }
    }

    async safeUpdateCollection(data) {
        try {
            let promises = data.map(async (obj) => {
                await Characters.find({ slug: obj.slug }).exec((err, docs) => {
                    if (err) throw new Error(err);
                    if (docs.length === 0) {
                        let newChar = new Characters(obj);
                        newChar.save((err) => {
                            if (err) throw new Error(err);
                            console.log('[WesterosCharacterFiller] '.green + obj.slug + ' successfully added to DB');
                        })
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
                    console.warn('[WesterosCharacterFiller] '.green + 'error in saving to db: ' + err);
                    return;
                } 
                console.log('[WesterosCharacterFiller] '.green + docs.length + ' characters successfully saved to MongoDB!');
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = CharacterFiller;