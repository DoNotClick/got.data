const City = require('../../models/westeros/city');

class CityStore {
    constructor() {}

    
    async getAll() {
        try {
            let data = await City.find({}, (err) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'City collection empty. Scraping should be started...' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByName(name) {
        try {
            let data = await City.find({name: name}, (err) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No cities matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByContinent(continent) {
        try {
            let data = await City.find({continent: continent}, (err) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No cities matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getById(id) {
        try {
            let data = await City.find({"_id": id}, (err) => {
                if (err) throw new Error(err);
            });

            if (!data) {
                return { success: -1, message: 'No cities matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }
}
module.exports = CityStore;