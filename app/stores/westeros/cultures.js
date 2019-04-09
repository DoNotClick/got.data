const Culture = require('../../models/westeros/culture');

class CultureStore {
    constructor() {}
    
    async getAll() {
        try {
            let data = await Culture.find({}, (err, cultures) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'Culture collection empty. Scraping should be started...' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByName(name) {
        try {
            let data = await Culture.find({name: name}, (err, cultures) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No cultures matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }
}
module.exports = CultureStore;