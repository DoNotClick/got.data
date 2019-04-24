const PageRanksFandom = require('../../models/fandom/pagerank');

class PageRankStore {
    constructor() {
    }


    // get list of pages, input: ['title1', 'title2']
    async getMultiple(data) {
        try {
            let data = await PageRanksFandom.find({
                title: {$in: data}
            }, (err, ranks) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: 0,
                    message: 'No page matched your criteria'
                };
            } else {
                return {
                    success: 1,
                    ranks: data
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
            let data = await PageRanksFandom.find({}, (err, ranks) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: -1,
                    message: 'getAll(): PageRank collection empty. Scraping should be started...'
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

    async getBySlug(slug) {
        try {
            let data = await PageRanksFandom.findOne({title: slug}, (err, rank) => {
                if(err) throw new Error(err);
            });
            if(!data) {
                return {
                    success: 0,
                    message: 'getAll(slug): Result empty'
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

module.exports = PageRankStore;