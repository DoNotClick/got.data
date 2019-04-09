const CastleFandom = require('../../models/fandom/castle')

class CastleStore {
    constructor() {}


    // get list of castles, input: ['name1', 'name2']
    async getMultiple(data) {
        try {
            let data = await CastleFandom.find({
                title: {$in: data}
            }, (err, castles) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: 0, message: 'No castles matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
        
    }
    
    async getAll() {
        try {
            let data = await CastleFandom.find({}, (err, castles) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'Castle collection empty. Scraping should be started...' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByName(name) {
        try {
            let data = await CastleFandom.find({name: name}, (err, castles) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No castles matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }


    async getByLocation(location) {
        try {
            let data = await CastleFandom.find({location: location}, (err, castles) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No castles matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

}
module.exports = CastleStore;