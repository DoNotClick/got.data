const mongoose = require('mongoose'),
      Episodes = require('../../../models/fandom/episodes'),
      EpisodeScraper = require('../../../controllers/scraper/fandom/episodes');


class EpisodeFandomFiller {
    constructor() {
        this.scraper = new EpisodeScraper();
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
            console.warn(error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('clearing collection...')
        Episodes.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('error in removing collection: ' + err);
            } else {
                console.log('Collection successfully removed');
            }
        });
        return;
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(episodes) {
        console.log('formating and saving scraped data to DB... this may take a few seconds');
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
        Episodes.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('error in saving to db: ' + err);
                return;
            } 
            console.log(docs.length + ' episodes successfully saved to MongoDB!');
        });
        return;
    }
}
module.exports = EpisodeFandomFiller;
