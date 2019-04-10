const Houses = require('../../models/westeros/house');

class HouseStore {
    constructor() {}

    // get list of houses, input: ['name1', 'name2']
    async getMultiple(data) {
        try {
            let data = await Houses.find({
                title: {$in: data}
            }, (err, houses) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: 0, message: 'No houses matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
        
    }
    
    async getAll() {
        try {
            let data = await Houses.find({}, (err, houses) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'House collection empty. Scraping should be started...' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByName(name) {
        try {
            let data = await Houses.find({name: name}, (err, houses) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No houses matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    // async getByLocation(location) {
    //     try {
    //         let data = await Houses.find({region: location}, (err, houses) => {
    //             if (err) throw new Error(err);
    //         });
    //         if (!data) {
    //             return { success: -1, message: 'No houses matched your criteria' };
    //         } else {
    //             return { success: 1, data: data };
    //         }
    //     } catch (e) {
    //         return { success: 0, message: 'error in database query! - ' + e }
    //     }
    // }
}
module.exports = HouseStore;