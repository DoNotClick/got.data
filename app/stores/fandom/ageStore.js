const AgeFandom = require('../../models/fandom/age')

class AgeStore {
    constructor() {}


    // get list of ages, input: ['name1', 'name2']
    async getMultiple(data) {
        try {
            let data = await AgeFandom.find({
                title: {$in: data}
            }, (err, ages) => {
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
            let data = await AgeFandom.find({}, (err, ages) => {
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
            let data = await AgeFandom.find({name: name}, (err, ages) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No characters matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByAge(age) {
        try {
            let data = await AgeFandom.find({age: age}, (err, ages) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No characters matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }
}
module.exports = AgeStore;