const RegionMap = require('../../models/map/region');

class RegionStore {
    constructor() {
    }

    async getAll() {
        try {
            let data = await RegionMap.find({});

            if(!data) {
                return {
                    success: -1,
                    message: 'getAll(): Region collection empty. Scraping should be started...'
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
            let data = await RegionMap.findOne({name: name});

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

    async getById(id) {
        try {
            let data = await RegionMap.findOne({'_id': id});

            if(!data) {
                return {
                    success: 0,
                    message: 'getById(id): Result empty'
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

module.exports = RegionStore;
