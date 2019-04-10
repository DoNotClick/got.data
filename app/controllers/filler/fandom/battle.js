const mongoose = require('mongoose');
const Battles = require('../../../models/fandom/battle');
const BattleScraper = require('../../scraper/fandom/battle');


class BattleFandomFiller {
    constructor(policy) {
        this.policy = policy;
        this.scraper = new BattleScraper();
    }

    async fill() {
        try {
            // start scraping
            let data = await this.scraper.scrapeAll();
            // clear collection
            await this.clearAll();
            // match scraped data to model
            data = await this.matchToModel(data);

            await this.insertToDb(data);
        } catch (error) {
            console.warn('[FandomBattleFiller] '.green + error);
        }
    }

    // remove collection
    async clearAll() {
        console.log('[FandomBattleFiller] '.green + 'clearing collection...');
        await Battles.deleteMany({}, (err, data) => {
            if (err) {
                console.warn('[FandomBattleFiller] '.green + 'error in removing collection: ' + err);
            } else {
                console.log('[FandomBattleFiller] '.green + 'Collection successfully removed');
            }
        });
    }
    // match attributes from Scraper to Mongoose Schema
    async matchToModel(battles) {
        console.log('[FandomBattleFiller] '.green + 'formating and saving scraped data to DB... this may take a few seconds');
        battles.map(battle => {
            let newEp = new Battles();
            for(let attr in battle) {
                // numbers sometimes return NaN which throws error in DB
                if((attr == 'dateOfBattle') && isNaN(battle[attr])) {
                    delete battle[attr];
                    continue;
                } 
                newEp[attr] = battle[attr];
            }
            return newEp;
        });

        
        return battles.filter(battle => battle['name']);
    }

    async insertToDb(data) {
        if(this.policy === FILLER_POLICY_REFILL)
        {
            await this.clearAll();
        }

        await Battles.insertMany(data, (err, docs) => {
            if (err) {
                console.warn('[FandomBattleFiller] '.green + 'error in saving to db: ' + err);
                return;
            } 
            console.log('[FandomBattleFiller] '.green + docs.length + ' battles successfully saved to MongoDB!');
        });
    }
}
module.exports = BattleFandomFiller;
