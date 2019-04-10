const mongoose = require('mongoose');
const Episodes = require('../../../models/fandom/episode');
const EpisodeScraper = require('../../scraper/fandom/episode');


class EpisodeFandomFiller {
    constructor(policy) {
        this.scraper = new EpisodeScraper();
        this.policy = policy;
    }

    async fill() {
        try {
            // start scraping
            let data = await this.scraper.scrapeAll();
            // clear collection
            await this.clearAll();
            // match scraped data to model
            data = await this.matchToModel(data);
            // add to DB
            await this.insertAll(data);
        } catch (error) {
            console.warn('[FandomEpisodeFiller] '.green + error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[FandomEpisodeFiller] '.green + 'clearing collection...')
        await Episodes.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[FandomEpisodeFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[FandomEpisodeFiller] '.green + 'Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(episodes) {
        console.log('[FandomEpisodeFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        episodes.map(episode => {
            let newEp = new Episodes();
            for(let attr in episode) {
                // numbers sometimes return NaN which throws error in DB
                if((attr == 'number' || attr == 'season' || attr == 'episode' || attr == 'viewers' || attr == 'runtime') && isNaN(episode[attr])) {
                    delete episode[attr];
                } 
                newEp[attr] = episode[attr];
            }
            return newEp;
        });
        return episodes.filter(episode => episode['title']);
    }

    async insertAll(data) {
        if(this.policy === FILLER_POLICY_REFILL)
        {
            await this.clearAll();
        }

        await Episodes.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('[FandomEpisodeFiller] '.green + 'error in saving to db: ' + err);
                return;
            } 
            console.log('[FandomEpisodeFiller] '.green + docs.length + ' episodes successfully saved to MongoDB!');
        });
    }
}
module.exports = EpisodeFandomFiller;
