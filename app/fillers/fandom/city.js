const mongoose = require('mongoose');
const Citys = require('../../models/fandom/city');
const CityScraper = require('../../scrapers/fandom/city');


class CityFandomFiller {
    constructor(policy) {
        this.scraper = new CityScraper();
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
            await this.insertToDb(data);
        } catch(error) {
            console.warn('[FandomCityFiller] '.green + error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[FandomCityFiller] '.green + 'clearing collection...');
        await Citys.deleteMany({}, (err, data) => {
            if(err) {
                console.warn('[FandomCityFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[FandomCityFiller] '.green + 'Collection successfully removed');
            }
        });
    }

    // match attributes from Scraper to Mongoose Schema
    async matchToModel(citys) {
        console.log('[FandomCityFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        citys.map(city => {
            let newEp = new Citys();
            for(let attr in city) {

                newEp[attr] = city[attr];
            }
            return newEp;
        });


        return citys.filter(city => city['name']);
    }

    async insertToDb(data) {
        if(this.policy === FILLER_POLICY_REFILL) {
            await this.clearAll();
        }

        await Citys.insertMany(data, (err, docs) => {
            if(err) {
                console.warn('[FandomCityFiller] '.green + 'error in saving to db: ' + err);
                return;
            }
            console.log('[FandomCityFiller] '.green + docs.length + ' citys successfully saved to MongoDB!');
        });
    }
}

module.exports = CityFandomFiller;
