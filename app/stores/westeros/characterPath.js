const CharacterPaths = require('../../models/westeros/characterPath');

class CharacterPathStore {
    constructor() {
    }


    async getAll() {
        try {
            let data = await CharacterPaths.find({});

            if(!data) {
                return {
                    success: -1,
                    message: 'getAll(): CharacterPath collection empty. Scraping should be started...'
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
            let data = await CharacterPaths.findOne({name: name}, (err, res) => {
                if(err) throw new Error(err);
            });

            if(!data) {
                return {
                    success: 0,
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

module.exports = CharacterPathStore;