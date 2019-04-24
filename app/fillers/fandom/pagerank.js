const PageRankScraper = require('../../scrapers/fandom/pagerank');
const PageRanks = require('../../models/fandom/pagerank');

class PageRankFiller {
    constructor(policy) {
        this.scraper = new PageRankScraper();
        this.policy = policy;
    }

    async fill() {
        let data = await this.scraper.scrapePageRanks();

        // match to db schema
        data = await this.matchToModel(data);

        // write to db
        await this.insertAll(data);
    }

    async matchToModel(data) {
        console.log('[FandomPagerankFiller] '.green + 'matching data to DB model...');
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
        console.log('[FandomPagerankFiller] '.green + 'clearing collection...');
        return await PageRanks.deleteMany({}, (err, data) => {
            if(err) {
                console.warn('[FandomPagerankFiller] '.green + 'Error in removing collection: ' + err);
            } else {
                console.log('[FandomPagerankFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    async insertAll(data) {
        if(this.policy === FILLER_POLICY_REFILL) {
            await this.clearAll();
        }

        console.log('[FandomPagerankFiller] '.green + 'writing to db...');
        try {
            return await PageRanks.insertMany(data, (err, docs) => {
                if(err) {
                    console.warn('[FandomPagerankFiller] '.green + 'error in saving to db: ' + err);
                    return;
                }
                console.log('[FandomPagerankFiller] '.green + docs.length + ' entries successfully saved to MongoDB!');
            });
        } catch(e) {
            throw new Error(e);
        }
    }
}

module.exports = PageRankFiller;
