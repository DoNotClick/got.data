const CharacterFiller = require('./westeros/character');
const CharacterPathFiller = require('./westeros/characterPath');
const CharacterLocationFiller = require('./westeros/characterLocation');
const CharacterImageFiller = require('./westeros/characterImage');
const CityFiller = require('./westeros/city');
const RegionFiller = require('./westeros/region');
const AgeFiller = require('./westeros/age');
const HouseFiller = require('./westeros/house');
const CultureFiller = require('./westeros/culture');
const ContinentFiller = require('./westeros/contintent');
const RankFiller = require('./westeros/pagerank');
const EventFiller = require('./westeros/event');

class UpdateWesteros {
    constructor(db) {
        this.db = db;
        this.characterFiller = new CharacterFiller(FILLER_POLICY_REFILL);
        this.characterPathFiller = new CharacterPathFiller(FILLER_POLICY_REFILL);
        this.characterLocationFiller = new CharacterLocationFiller(FILLER_POLICY_REFILL);
        this.characterImageFiller = new CharacterImageFiller(FILLER_POLICY_REFILL);
        this.cityFiller = new CityFiller(FILLER_POLICY_REFILL);
        this.regionFiller = new RegionFiller(FILLER_POLICY_REFILL);
        this.ageFiller = new AgeFiller(FILLER_POLICY_REFILL);
        this.houseFiller = new HouseFiller(FILLER_POLICY_REFILL);
        this.cultureFiller = new CultureFiller(FILLER_POLICY_REFILL);
        this.continentFiller = new ContinentFiller(FILLER_POLICY_REFILL);
        this.eventFiller = new EventFiller(FILLER_POLICY_REFILL);
        this.rankFiller = new RankFiller(FILLER_POLICY_REFILL);

        this.collections = [
            'westerosages',
            'westeroscities',
            'westeroshouses',
            'westeroscharacters',
            'westeroscharacterlocations',
            'westeroscharacterpaths',
            'westerosevents',
            'westerospageranks',
            'westerosregions',
            'westeroscultures',
            'westeroscontinents',
        ];
    }

    async basicUpdate() {
        const self = this;

        console.log('[WesterosUpdater] '.green + 'filling book collections');
        let promises = this.collections.map(async(collection) => {
            console.log('[WesterosUpdater] '.green + 'checking ' + collection);
            try {
                switch(collection) {
                    case 'westerosages':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[WesterosUpdater] '.green + "filling " + collection);
                                    self.ageFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'westeroshouses':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[WesterosUpdater] '.green + "filling " + collection);
                                    self.houseFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'westeroscities':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[WesterosUpdater] '.green + "filling " + collection);
                                    self.cityFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'westeroscharacters':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[WesterosUpdater] '.green + "filling " + collection);
                                    self.characterFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'westeroscharacterlocations':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[WesterosUpdater] '.green + "filling " + collection);
                                    self.characterLocationFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'westeroscharacterpaths':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[WesterosUpdater] '.green + "filling " + collection);
                                    self.characterPathFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'westerospageranks':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[WesterosUpdater] '.green + "filling " + collection);
                                    self.rankFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'westerosregions':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[WesterosUpdater] '.green + "filling " + collection);
                                    self.regionFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'westeroscultures':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[WesterosUpdater] '.green + "filling " + collection);
                                    self.cultureFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'westerosevents':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[WesterosUpdater] '.green + "filling " + collection);
                                    self.eventFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'westeroscontinents':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[WesterosUpdater] '.green + "filling " + collection);
                                    self.continentFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    default:
                        console.error('[WesterosUpdater] '.green + "invalid collection " + collection);

                        return new Promise((resolve) => {resolve()});
                }
            } catch(e) {
                console.warn('[WesterosUpdater] '.green + 'error in fetching data ' + e);

                return new Promise((resolve) => {resolve()});
            }
        });

        // execute fillers without dependencies
        await Promise.all(promises);

        // execute fillers with dependencies
        promises = [];

        promises.push(new Promise(resolve => {
            console.log('[WesterosUpdater] '.green + "checking images");

            try
            {
                let fs = require('fs');
                let imgDir = __dirname + '/../../../misc/images/characters/book/';

                fs.readdir(imgDir, (err, files) => {
                    if(err) throw new Error(err);

                    if(!files || files.length <= 2) {
                        console.log('[WesterosUpdater] '.green + 'downloading show character images');

                        self.characterImageFiller.fill().then(() => {
                            resolve();
                        });
                    }
                    else
                    {
                        resolve();
                    }
                });
            }
            catch (e) {
                console.log(e);
            }
        }));

        await Promise.all(promises);

        console.log('[WesterosUpdater] '.green + 'Finished fetching book data.');
    }
}

module.exports = UpdateWesteros;