const AssassinFandom = require('../../models/fandom/assassin');

class AssassinStore {
    constructor() {
    }


    // get list of assassins, input: ['name1', 'name2']
    async getMultiple(data) {
        try {
            let data = await AssassinFandom.find({
                title: {$in: data}
            }, (err, assassins) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: 0,
                    message: 'No assassins matched your criteria'
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
            let data = await AssassinFandom.find({}, (err, assassins) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: -1,
                    message: 'getAll(): Assassin collection empty. Scraping should be started...'
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
            let data = await AssassinFandom.findOne({name: name}, (err, assassins) => {
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

module.exports = AssassinStore;