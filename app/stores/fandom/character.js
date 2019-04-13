const CharactersFandom = require('../../models/fandom/character');

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
            let data = await CharactersFandom.find({});
            // .populate('pagerank age', 'rank title name age')
            if (!data) {
                return { success: -1, message: 'getAll(): Character collection empty. Scraping should be started...' };
            } else {
                return { success: 1, data: data };
            }
            
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByName(name) {
        try {
            let data = await CharactersFandom.findOne({name: name}).populate('pagerank age', 'rank title name age');

            if (!data) {
                return { success: 0, message: 'getByName(name): Result empty' };
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
            let data = await CharactersFandom.findOne({slug: slug});
            // .populate('pagerank age', 'rank age')
            if (!data) {
                return { success: 0, message: 'getBySlug(slug): Result empty' };
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
                return { success: 0, message: 'getByHouse(house): Result empty' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async updateGeneral(slug, plod, longevity, longevityStart) {
        try {
            let data = await CharactersFandom.findOne({slug: slug});
            if (!data) {
                return { success: 0, message: 'updateGeneral(slug, plod, longevity, longvityStart): ' };
            } else {
                // let arr = JSON.parse(longevity);
                data.longevity = longevity;
                data.plod = plod;
                data.longevityStart = longevityStart
                await data.save();
                return { success: 1, message: data.name + ' has been updated' };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async updateGroupB(slug, plod, longevity, longevityStart) {
        try {
            let data = await CharactersFandom.findOne({slug: slug});
            if (!data) {
                return { success: 0, message: 'No characters matched your criteria' };
            } else {
                // let arr = JSON.parse(longevity);
                data.longevityB = longevity;
                data.plodB = plod;
                data.longevityStartB = longevityStart;
                await data.save();
                return { success: 1, message: data.name + ' has been updated (Group B)' };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async updateGroupC(slug, plod, longevity, longevityStart) {
        try {
            let data = await CharactersFandom.findOne({slug: slug});
            if (!data) {
                return { success: 0, message: 'No characters matched your criteria' };
            } else {
                // let arr = JSON.parse(longevity);
                data.longevityC = longevity;
                data.plodC = plod;
                data.longevityStartC = longevityStart
                await data.save();
                return { success: 1, message: data.name + ' has been updated (Group C)' };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }
}
module.exports = CharacterStore;
