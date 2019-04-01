const Age = require('../../models/westeros/ages');

class AgeStore {
    constructor() {}
    
    async getAll() {
        try {
            let data = await Age.find({}, (err, ages) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'Age collection empty. Scraping should be started...' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByName(name) {
        try {
            let data = await Age.find({name: name}, (err, ages) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No ages matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }
}
module.exports = AgeStore;