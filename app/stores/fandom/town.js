const TownFandom = require('../../models/fandom/town')

class TownStore {
    constructor() {}


    // get list of towns, input: ['name1', 'name2']
    async getMultiple(data) {
        try {
            let data = await TownFandom.find({
                name: {$in: data}
            }, (err, towns) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: 0, message: 'No towns matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
        
    }
    
    async getAll() {
        try {
            let data = await TownFandom.find({}, (err, towns) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'Town collection empty. Scraping should be started...' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByName(name) {
        try {
            let data = await TownFandom.find({name: name}, (err, towns) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No towns matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }


    async getByLocation(location) {
        try {
            let data = await TownFandom.find({location: location}, (err, towns) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No towns matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByRuler(name) {
        try {
            let data = await TownFandom.find({rulers: name}, (err, towns) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No towns matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByReligion(name) {
        try {
            let data = await TownFandom.find({religion: name}, (err, towns) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No towns matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

}
module.exports = TownStore;