const Episodes = require('../../models/fandom/episode');

class EpisodeStore {
    constructor() {
    }


    // get list of episodes, input: ['name1', 'name2']
    async getMultiple(data) {
        try {
            let data = await Episodes.find({
                title: {$in: data}
            }, (err, eps) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: 0,
                    message: 'No episodes matched your criteria'
                };
            } else {
                return {
                    success: 1,
                    episodes: data
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
            let data = await Episodes.find({}, (err, eps) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: -1,
                    message: 'getAll(): Episode collection empty. Scraping should be started...'
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

    async getByTitle(title) {
        try {
            let data = await Episodes.findOne({title: title}, (err, ep) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: 0,
                    message: 'getByTitle(title): Result empty'
                };
            } else {
                return {
                    success: 1,
                    episodes: data
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

module.exports = EpisodeStore;