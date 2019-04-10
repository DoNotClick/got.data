const PageRanksWesteros = require('../../models/westeros/pagerank');

class PageRankStore {
    constructor() {}

    // get list of pages, input: ['title1', 'title2']
    async getMultiple(data) {
        try {
            let data = await PageRanksWesteros.find({
                title: {$in: data}
            }, (err, ranks) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: 0, message: 'No page matched your criteria' };
            } else {
                return { success: 1, ranks: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
        
    }
    
    async getAll() {
        try {
            let data = await PageRanksWesteros.find({}, (err, ranks) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: -1, message: 'PageRank collection empty. Scraping should be started...' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getBySlug(slug) {
        try {
            let data = await PageRanksWesteros.findOne({title: slug}, (err, rank) => {
                if (err) throw new Error(err);
            });
            if (!data) {
                return { success: 0, message: 'No page matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

}
module.exports = PageRankStore;