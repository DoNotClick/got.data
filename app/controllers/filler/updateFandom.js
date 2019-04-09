const CharacterFiller = require('./fandom/character'),
    EpisodeFiller = require('./fandom/episode'),
    ReligionFiller = require('./fandom/religion'),
    PageRankFiller = require('./fandom/pagerank'),
    AnimalFiller = require('./fandom/animal'),
    AssassinFiller = require('./fandom/assassin'),
    BastardFiller = require('./fandom/bastard'),
    BattleFiller = require('./fandom/battle'),
    CastleFiller = require('./fandom/castle'),
    CityFiller = require('./fandom/city'),
    RegionFiller = require('./fandom/region'),
    TownFiller = require('./fandom/town'),
    AgeFiller = require('./fandom/age'),
    HouseFiller = require('./fandom/house'),
    EventFiller = require('./fandom/event'),
    CharacterImageFiller = require('./fandom/characterImage');


class UpdateFandom {
    constructor(db) {
        this.db = db;
        this.characterFiller = new CharacterFiller(1);
        this.characterImageFiller = new CharacterImageFiller(1);
        this.episodeFiller = new EpisodeFiller();
        this.religionFiller = new ReligionFiller();
        this.rankFiller = new PageRankFiller();
        this.animalFiller = new AnimalFiller();
        this.assassinFiller = new AssassinFiller();
        this.bastardFiller = new BastardFiller();
        this.battleFiller = new BattleFiller();
        this.castleFiller = new CastleFiller();
        this.cityFiller = new CityFiller();
        this.regionFiller = new RegionFiller();
        this.townFiller = new TownFiller();
        this.ageFiller = new AgeFiller();
        this.houseFiller = new HouseFiller();
        this.eventFiller = new EventFiller();

        this.collections = [
            'fandomages',
            'fandomanimals',
            'fandomhouses',
            'fandomassassins',
            'fandombastards',
            'fandombattles',
            'fandomcastles',
            'fandomcities',
            'fandomcharacters',
            'fandomevents',
            'fandomreligions',
            'fandomregions',
            'fandompageranks',
            'fandomepisodes',
            'fandomtowns'
        ];
    }

    async basicUpdate() {
        const self = this;

        console.log('[FandomUpdater] '.green + 'filling show collections');
        let promises = this.collections.map(async(collection) => {
            // console.log('checking ' + collection.name);
            console.log('[FandomUpdater] '.green + 'checking ' + collection);
            try {
                switch(collection) {
                    case 'fandomages':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.ageFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'fandomhouses':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.houseFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'fandomanimals':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.animalFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'fandomassassins':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.assassinFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'fandombastards':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.bastardFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'fandombattles':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.battleFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'fandomcastles':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.castleFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'fandomcities':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.cityFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'fandomcharacters':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.characterFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'fandomevents':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.eventFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'fandomreligions':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.religionFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'fandompageranks':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.rankFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'fandomepisodes':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.episodeFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'fandomregions':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.regionFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'fandomtowns':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[FandomUpdater] '.green + "filling " + collection);
                                    self.townFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    default:
                        console.error('[FandomUpdater] '.green + "invalid collection " + collection);
                        return new Promise((resolve) => {resolve()});
                }
            } catch(e) {
                console.warn('[FandomUpdater] '.green + 'error in fetching data ' + e);

                return new Promise((resolve) => {resolve()});
            }
        });

        // execute all fillers without dependencies
        await Promise.all(promises);

        // execute filler with dependencies
        promises = [];

        promises.push(new Promise(resolve => {
            console.log('[FandomUpdater] '.green + "checking images");

            try
            {
                let fs = require('fs');
                let imgDir = __dirname + '/../../../misc/images/characters/show/';
                fs.readdir(imgDir, (err, files) => {
                    if(err) throw new Error(err);
                    if(!files || files.length <= 2) {
                        console.log('[FandomUpdater] '.green + 'downloading show character images');

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

        console.log('[FandomUpdater] '.green + 'Finished fetching show data.')
    }
}

module.exports = UpdateFandom;