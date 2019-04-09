const CharacterMap = require('../../models/map/character');

class CharacterStore {
    constructor() {}

    async getAll() {
        try {
            let data = await CharacterMap.find({});

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
            let data = await CharacterMap.findOne({name: name});

            if (!data) {
                return { success: 0, message: 'No characters matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getById(id) {
        try {
            let data = await CharacterMap.findOne({'_id': id});

            if (!data) {
                return { success: 0, message: 'No characters matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getBySlug(slug) {
        try {
            let data = await CharacterMap.findOne({slug: slug});
            if (!data) {
                return { success: 0, message: 'No characters matched your criteria' };
            } else {
                return { success: 1, data: data };
            }

        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

}
module.exports = CharacterStore;
