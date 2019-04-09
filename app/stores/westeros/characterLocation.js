const CharacterLocations = require('../../models/westeros/characterLocation');

class CharacterLocationStore {
    constructor() {}

    
    async getAll() {
        try {
            let data = await CharacterLocations.find({});
            
            if (!data) {
                return { success: -1, message: 'CharacterLocation collection empty. Scraping should be started...' };
            } else {
                return { success: 1, data: data };
            }
            
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByName(name) {
        try {
            let data = await CharacterLocations.findOne({name: name});

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
            let data = await CharacterLocations.findOne({slug: slug});

            if (!data) {
                return { success: 0, message: 'No characters matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByLocation(location) {
        try {
            let data = await CharacterLocations.findMany({locations: location});

            if (!data) {
                return { success: 0, message: 'No locations matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }
}
module.exports = CharacterLocationStore;