const CharacterFiller = require('./fandom/charactersFandom'),
    EpisodeFiller = require('./fandom/episodesFandom'),
    ReligionFiller = require('./fandom/religionsFandom'),
    PageRankFiller = require('./fandom/pagerankFandom'),
    AnimalFiller = require('./fandom/animalFandom'),
    AssassinFiller = require('./fandom/assassinFandom'),
    BastardFiller = require('./fandom/bastardFandom'),
    BattleFiller = require('./fandom/battleFandom'),
    CastleFiller = require('./fandom/castleFandom'),
    CityFiller = require('./fandom/cityFandom'),
    RegionFiller = require('./fandom/regionFandom'),
    TownFiller = require('./fandom/townFandom'),
    AgeFiller = require('./fandom/ageFandom'),
    HouseFiller = require('./fandom/houseFandom'),
    EventFiller = require('./fandom/eventFandom'),
    CharacterImageFiller = require('./fandom/characterImages');


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

        console.log('filling show collections');
        let promises = this.collections.map(async(collection) => {
            // console.log('checking ' + collection.name);
            console.log('checking ' + collection);
            try {
                switch(collection) {
                    case 'fandomages':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log("filling " + collection);
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
                                    console.log("filling " + collection);
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
                                    console.log("filling " + collection);
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
                                    console.log("filling " + collection);
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
                                    console.log("filling " + collection);
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
                                    console.log("filling " + collection);
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
                                    console.log("filling " + collection);
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
                                    console.log("filling " + collection);
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
                                    console.log("filling " + collection);
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
                                    console.log("filling " + collection);
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
                                    console.log("filling " + collection);
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
                                    console.log("filling " + collection);
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
                                    console.log("filling " + collection);
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
                                    console.log("filling " + collection);
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
                                    console.log("filling " + collection);
                                    self.townFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    default:
                        console.error("invalid collection " + collection);
                        return new Promise((resolve) => {resolve()});
                }
            } catch(e) {
                console.warn('error in fetching data ' + e);

                return new Promise((resolve) => {resolve()});
            }
        });

        // execute all fillers without dependencies
        await Promise.all(promises);

        // execute filler with dependencies
        promises = [];

        promises.push(new Promise(resolve => {
            console.log("checking images");

            let fs = require('fs');
            let imgDir = __dirname + '/../../../misc/images/characters/show/';
            fs.readdir(imgDir, (err, files) => {
                if(err) throw new Error(err);
                if(!files || files.length <= 2) {
                    console.log('downloading show character images');

                    self.characterImageFiller.fill().then(() => {
                        resolve();
                    });
                }
                else
                {
                    resolve();
                }
            });
        }));

        await Promise.all(promises);

        console.log('Finished fetching show data.')
    }
}

module.exports = UpdateFandom;