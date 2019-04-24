const Regions = require('../../models/westeros/region');

class RegionStore {
    constructor() {
    }

    // get list of regions, input: ['name1', 'name2']
    async getMultiple(data) {
        try {
            let data = await Regions.find({
                title: {$in: data}
            }, (err, regions) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: 0,
                    message: 'No regions matched your criteria'
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
            let data = await Regions.find({}, (err, regions) => {
                if(err) throw new Error(err);
            });
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
            let data = await Regions.find({name: name}, (err, regions) => {
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

    async getByContinent(continent) {
        try {
            let data = await Regions.find({continent: continent}, (err, regions) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: -1,
                    message: 'getByContinent(continent): Result empty'
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