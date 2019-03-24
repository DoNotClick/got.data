const AnimalFandom = require('../../models/fandom/animals')

class AnimalStore {
    constructor() {}


    // get list of animals, input: ['name1', 'name2']
    async getMultiple(data) {
        try {
            let data = await AnimalFandom.find({
                title: {$in: data}
            }, (err, animals) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: 0, message: 'No animals matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }
    
    async getAll() {
        try {
            let data = await AnimalFandom.find({}, (err, animals) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'Animal collection empty. Scraping should be started...' };
            } else {
                return { success: 1, data: data };
            }
        } catch(e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
        
    }

    async getByHabitat(habitat) {
        try {
            let data = await AnimalFandom.find({habitat: habitat}, (err, animals) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'No animals matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch(e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
        
    }
}
module.exports = AnimalStore;