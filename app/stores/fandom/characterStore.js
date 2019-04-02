const CharactersFandom = require('../../models/fandom/characters');

class CharacterStore {
    constructor() {}

    async add(character) {
        try {
            for (let key in character) {
                if (!CharactersFandom.schema.path.hasOwnProperty(key)) {
                    return { message: 'Character attribute ' + key + ' doesn\'t match MongoDB schema!' }
                }
            }
            return await CharactersFandom.find({name: character.name}, (err, char) => {
                if (err) throw new Error(err);
                if (char) return { message: 'Character ' + character.name + ' already exists!'}
            })
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    // get list of characters, input: ['name1', 'name2']
    async getMultiple(data) {
        try {
            let data = await CharactersFandom.find({
                name: {$in: data}
            }, (err, chars) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: 0, message: 'No characters matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
        
    }
    
    async getAll() {
        try {
            let data = await CharactersFandom.find({}).populate('pagerank', 'rank title');
            
            if (!data) {
                return { success: -1, message: 'Character collection empty. Scraping should be started...' };
            } else {
                return { success: 1, data: data };
            }
            
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByName(name) {
        try {
            let data = await CharactersFandom.findOne({name: name}).populate('pagerank', 'rank title');

            if (!data) {
                return { success: 0, message: 'No characters matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    // ! wtf doesn't select only rank.. why?!
    // https://mongoosejs.com/docs/populate.html
    // FYI: title = foreign field, see character model
    async getBySlug(slug) {
        try {
            let data = await CharactersFandom.findOne({slug: slug}).populate('pagerank', 'rank title');

            if (!data) {
                return { success: 0, message: 'No characters matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
            
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByHouse(house) {
        try {
            let data = await CharactersFandom.find({house: house}, (err, chars) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: 0, message: 'No characters matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async updatePlod(slug, plod) {
        try {
            let data = await CharactersFandom.findOne({slug: slug});
            if (!data) {
                return { success: 0, message: 'No characters matched your criteria' };
            } else {
                data.plod = plod;
                await data.save();
                return { success: 1, message: data.name + ' has been updated' };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async updateLongevity(slug, longevity) {
        try {
            let data = await CharactersFandom.findOne({slug: slug});
            if (!data) {
                return { success: 0, message: 'No characters matched your criteria' };
            } else {
                data.longevity = longevity;
                await data.save();
                return { success: 1, message: data.name + ' has been updated' };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }
}
module.exports = CharacterStore;
