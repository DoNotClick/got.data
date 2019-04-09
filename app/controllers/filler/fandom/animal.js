const mongoose = require('mongoose'),
      Animals = require('../../../models/fandom/animal'),
      AnimalScraper = require('../../scraper/fandom/animal');


class AnimalFandomFiller {
    constructor() {
        this.scraper = new AnimalScraper();
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
        } catch (error) {
            console.warn('[FandomAnimalFiller] '.green + error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[FandomAnimalFiller] '.green + 'clearing collection...');
        await Animals.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[FandomAnimalFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[FandomAnimalFiller] '.green + 'Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(animals) {
        console.log('[FandomAnimalFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        animals.map(animal => {
            let newEp = new Animals();
            for(let attr in animal) {
                
                newEp[attr] = animal[attr];
            }
            return newEp;
        });

        
        return animals.filter(animal => animal['name']);
    }

    async insertToDb(data) {
        await Animals.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('[FandomAnimalFiller] '.green + 'error in saving to db: ' + err);
                return;
            } 
            console.log('[FandomAnimalFiller] '.green + docs.length + ' animals successfully saved to MongoDB!');
        });
    }
}
module.exports = AnimalFandomFiller;
