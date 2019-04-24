const BastardFandom = require('../../models/fandom/bastard');

class BastardStore {
    constructor() {
    }


    // get list of bastards, input: ['name1', 'name2']
    async getMultiple(data) {
        try {
            let data = await BastardFandom.find({
                title: {$in: data}
            }, (err, bastards) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: 0,
                    message: 'getMultiple(): Bastard collection empty. Scraping should be started...'
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

    async getAll() {
        try {
            let data = await BastardFandom.find({}, (err, bastards) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: -1,
                    message: 'getAll(): Bastard collection empty. Scraping should be started...'
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
            let data = await BastardFandom.findOne({name: name}, (err, bastards) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: -1,
                    message: 'getByName(name): Result empty'
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

module.exports = BastardStore;