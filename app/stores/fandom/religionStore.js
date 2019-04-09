const ReligionsFandom = require('../../models/fandom/religions')

class ReligionStore {
    constructor() {}


    // get list of pages, input: ['name1', 'name2']
    async getMultiple(data) {
        try {
            let data = await ReligionsFandom.find({
                name: {$in: data}
            }, (err, rel) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: 0, message: 'No religion matched your criteria' };
            } else {
                return { success: 1, religions: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }
    
    async getAll() {
        try {
            let data = await ReligionsFandom.find({}, (err, rels) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'Religion collection empty. Has scraping been started yet?' };
            } else {
                return { success: 1, religions: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByName(name) {
        try {
            let data = await ReligionsFandom.findOne({name: name}, (err, rel) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: 0, message: 'No religion matched your criteria' };
            } else {
                return { success: 1, religions: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
        
    }

}
module.exports = ReligionStore;