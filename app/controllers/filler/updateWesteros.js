const CharacterFiller = require('./westeros/character'),
    CharacterPathFiller = require('./westeros/characterPath'),
    CharacterLocationFiller = require('./westeros/characterLocation'),
    CharacterImageFiller = require('./westeros/characterImage'),
    CityFiller = require('./westeros/city'),
    RegionFiller = require('./westeros/region'),
    AgeFiller = require('./westeros/age'),
    HouseFiller = require('./westeros/house'),
    CultureFiller = require('./westeros/culture'),
    ContinentFiller = require('./westeros/contintent'),
    RankFiller = require('./westeros/pagerank'),
    EventFiller = require('./westeros/event');


class UpdateWesteros {
    constructor(db) {
        this.db = db;
        this.characterFiller = new CharacterFiller(1);
        this.characterPathFiller = new CharacterPathFiller(1);
        this.characterLocationFiller = new CharacterLocationFiller(1);
        this.characterImageFiller = new CharacterImageFiller(1);
        this.cityFiller = new CityFiller(1);
        this.regionFiller = new RegionFiller(1);
        this.ageFiller = new AgeFiller(1);
        this.houseFiller = new HouseFiller(1);
        this.cultureFiller = new CultureFiller(1);
        this.continentFiller = new ContinentFiller(1);
        this.eventFiller = new EventFiller(1);
        this.rankFiller = new RankFiller(1);

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