const Continents = require('../../models/westeros/continent');

class ContinentStore {
    constructor() {}

    async getAll() {
        try {
            let data = await Continents.find({}, (err, continents) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'Continent collection empty. Scraping should be started...' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByName(name) {
        try {
            let data = await Continents.find({name: name}, (err, continents) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No continents matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }
}
module.exports = ContinentStore;