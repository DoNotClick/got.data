const Age = require('../../models/westeros/age');

class AgeStore {
    constructor() {
    }

    async getAll() {
        try {
            let data = await Age.find({}, (err, ages) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: -1,
                    message: ' getAll(): Age collection empty. Scraping should be started...'
                };
            } else {
                return {
                    success: 1,
                    data: data
                };
            }
        } catch(e) {
            return {
                success: 0,
                message: 'error in database query! - ' + e
            };
        }
    }

    async getByName(name) {
        try {
            let data = await Age.find({name: name}, (err, ages) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: -1,
                    message: ' getByName(name): Result empty'
                };
            } else {
                return {
                    success: 1,
                    data: data
                };
            }
        } catch(e) {
            return {
                success: 0,
                message: 'error in database query! - ' + e
            };
        }
    }
}

module.exports = AgeStore;