const CharacterFiller = require('./fandom/character');
const EpisodeFiller = require('./fandom/episode');
const ReligionFiller = require('./fandom/religion');
const PageRankFiller = require('./fandom/pagerank');
const AnimalFiller = require('./fandom/animal');
const AssassinFiller = require('./fandom/assassin');
const BastardFiller = require('./fandom/bastard');
const BattleFiller = require('./fandom/battle');
const CastleFiller = require('./fandom/castle');
const CityFiller = require('./fandom/city');
const RegionFiller = require('./fandom/region');
const TownFiller = require('./fandom/town');
const AgeFiller = require('./fandom/age');
const HouseFiller = require('./fandom/house');
const EventFiller = require('./fandom/event');
const CharacterImageFiller = require('./fandom/characterImage');

class UpdateFandom {
    constructor(db) {
        this.db = db;
        this.characterFiller = new CharacterFiller(FILLER_POLICY_REFILL);
        this.characterImageFiller = new CharacterImageFiller(FILLER_POLICY_REFILL);
        this.episodeFiller = new EpisodeFiller(FILLER_POLICY_REFILL);
        this.religionFiller = new ReligionFiller(FILLER_POLICY_REFILL);
        this.rankFiller = new PageRankFiller(FILLER_POLICY_REFILL);
        this.animalFiller = new AnimalFiller(FILLER_POLICY_REFILL);
        this.assassinFiller = new AssassinFiller(FILLER_POLICY_REFILL);
        this.bastardFiller = new BastardFiller(FILLER_POLICY_REFILL);
        this.battleFiller = new BattleFiller(FILLER_POLICY_REFILL);
        this.castleFiller = new CastleFiller(FILLER_POLICY_REFILL);
        this.cityFiller = new CityFiller(FILLER_POLICY_REFILL);
        this.regionFiller = new RegionFiller(FILLER_POLICY_REFILL);
        this.townFiller = new TownFiller(FILLER_POLICY_REFILL);
        this.ageFiller = new AgeFiller(FILLER_POLICY_REFILL);
        this.houseFiller = new HouseFiller(FILLER_POLICY_REFILL);
        this.eventFiller = new EventFiller(FILLER_POLICY_REFILL);

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