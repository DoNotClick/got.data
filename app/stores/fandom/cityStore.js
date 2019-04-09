const CityFandom = require('../../models/fandom/city')

class CityStore {
    constructor() {}


    // get list of cities, input: ['name1', 'name2']
    async getMultiple(data) {
        try {
            let data = await CityFandom.find({
                name: {$in: data}
            }, (err, cities) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: 0, message: 'No cities matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
        
    }
    
    async getAll() {
        try {
            let data = await CityFandom.find({}, (err, cities) => {
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
            let data = await CityFandom.find({name: name}, (err, cities) => {
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


    async getByLocation(location) {
        try {
            let data = await CityFandom.find({location: location}, (err, cities) => {
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