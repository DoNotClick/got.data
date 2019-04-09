const PageRankScraper = require('../../../controllers/scraper/westeros/pagerank');
const PageRanks = require('../../../models/westeros/pagerank');

class PageRankFiller {
    constructor() {
        this.scraper = new PageRankScraper();
    }

    async fill() {
        // scrape page ranks
        // ! roughly 5000 entries, so this will take a while!
        // ? Should this be started in the filler or should we pass it to this function ? 
        let data = await this.scraper.scrapePageRanks();

        // match to db schema
        data = await this.matchToModel(data);

        // write to db
        await this.insertAll(data);
    }

    async matchToModel(data) {
        console.log('[WesterosPagerankFiller] '.green + 'matching data to DB model...');
        let ranks = [];
        Object.keys(data).map((key) => {
            let newRank = new PageRanks();
            newRank['title'] = key;
            newRank['rank'] = data[key];
            ranks.push(newRank);
        });
        return ranks.filter((entry) => entry['title']);
    }

    // remove collection
    async clearAll() {
        console.log('[WesterosPagerankFiller] '.green + 'clearing collection...')
        return await PageRanks.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[WesterosPagerankFiller] '.green + 'Error in removing collection: ' + err);
            } else {
                console.log('[WesterosPagerankFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    async insertAll(data) {
        await this.clearAll();
        console.log('[WesterosPagerankFiller] '.green + 'writing to db...');
        try {
            return await PageRanks.insertMany(data, (err, docs) => {
                if (err) {
                    console.warn('[WesterosPagerankFiller] '.green + 'error in saving to db: ' + err);
                    return;
                } 
                console.log('[WesterosPagerankFiller] '.green + docs.length + ' entries successfully saved to MongoDB!');
            });
        } catch (e) {
            throw new Error(e);
        }
    }
}
module.exports = PageRankFiller;