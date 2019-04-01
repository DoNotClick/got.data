const   CharacterFiller = require('../app/controllers/filler/westeros/characters'),
        CharacterPathFiller = require('../app/controllers/filler/westeros/characterPaths'),
        CharacterLocationFiller = require('../app/controllers/filler/westeros/characterLocations'),
        CityFiller = require('../app/controllers/filler/westeros/cities'),
        RegionFiller = require('../app/controllers/filler/westeros/regions'),
        AgeFiller = require('../app/controllers/filler/westeros/ages'),
        HouseFiller = require('../app/controllers/filler/westeros/houses'),
        CultureFiller = require('../app/controllers/filler/westeros/cultures'),
        ContinentFiller = require('../app/controllers/filler/westeros/contintents'),
        EventFiller = require('../app/controllers/filler/westeros/events');


class UpdateWesteros {
    constructor(db) {
        this.db = db;
        this.characaterFiller = new CharacterFiller();
        this.characterPathFiller = new CharacterPathFiller();
        this.characterLoctaionFiller = new CharacterLocationFiller();
        this.cityFiller = new CityFiller();
        this.regionFiller = new RegionFiller();
        this.ageFiller = new AgeFiller();
        this.houseFiller = new HouseFiller();
        this.cultureFiller = new CultureFiller();
        this.continentFiller = new ContinentFiller();
        this.eventFiller = new EventFiller();
    }

    async basicUpdate() {
        const self = this;
        this.db.listCollections().toArray(async (err, names) => {
            if (err) throw new Error(err);
            console.log('filling collections');
            if (names.length === 0) {
                // let fillers = [charFiller.fill, epFiller.fill, relFiller.fill, rankFiller.fill];
                console.log('No collections available... scraping everything. This may take a while...')
                let fillers = [
                    self.characaterFiller.fill,
                    self.cityFiller.fill,
                    self.regionFiller.fill,
                    self.ageFiller.fill,
                    self.houseFiller.fill,
                    self.cultureFiller.fill,
                    self.continentFiller.fill,
                    self.eventFiller.fill,
                    self.characterLoctaionFiller.fill,
                    self.characterPathFiller.fill
                ];
                let promises = fillers.map(async (job) => await job());
                return await Promise.all(promises);
            }
            let filling = names.map(async (collection) => {
                console.log(collection.name);
                try {
                    switch (collection.name) {
                        case 'ages':
                            await self.db.collection(collection.name).countDocuments(async function(err, count) {
                                if (err) throw new Error(err);
                                if( count == 0 ) {
                                    await self.ageFiller.fill();
                                }
                            });
                            break;
                        case 'houses':
                            await self.db.collection(collection.name).countDocuments(async function(err, count) {
                                if (err) throw new Error(err);
                                if( count == 0 ) {
                                    await self.houseFiller.fill();
                                }
                            });
                            break;
                        case 'citys':
                            await self.db.collection(collection.name).countDocuments(async function(err, count) {
                                if (err) throw new Error(err);
                                if( count == 0 ) {
                                    await self.cityFiller.fill();
                                }
                            });
                            break;
                        case 'characters':
                            await self.db.collection(collection.name).countDocuments(async function(err, count) {
                                if (err) throw new Error(err);
                                if( count == 0 ) {
                                    await self.characaterFiller.fill();
                                }
                            });
                            break;
                        case 'characterlocations':
                            await self.db.collection(collection.name).countDocuments(async function(err, count) {
                                if (err) throw new Error(err);
                                if( count == 0 ) {
                                    await self.characterLoctaionFiller.fill();
                                }
                            });
                            break;
                        case 'characterpaths':
                            await self.db.collection(collection.name).countDocuments(async function(err, count) {
                                if (err) throw new Error(err);
                                if( count == 0 ) {
                                    await self.characterPathFiller.fill();
                                }
                            });
                            break;
                        case 'regions':
                            await self.db.collection(collection.name).countDocuments(async function(err, count) {
                                if (err) throw new Error(err);
                                if( count == 0 ) {
                                    await self.regionFiller.fill();
                                }
                            });
                            break;
                        case 'cultures':
                            await self.db.collection(collection.name).countDocuments(async function(err, count) {
                                if (err) throw new Error(err);
                                if( count == 0 ) {
                                    await self.cultureFiller.fill();
                                }
                            });
                            break;
                        case 'events':
                            await self.db.collection(collection.name).countDocuments(async function(err, count) {
                                if (err) throw new Error(err);
                                if( count == 0 ) {
                                    await self.eventFiller.fill();
                                }
                            });
                            break;
                        case 'continents':
                            await self.db.collection(collection.name).countDocuments(async function(err, count) {
                                if (err) throw new Error(err);
                                if( count == 0 ) {
                                    await self.continentFiller.fill();
                                }
                            });
                            break;
                        default:
                            console.log('Unknown collection in database... check updateFandom.js');
                            // let fillers = [charFiller.fill(), epFiller.fill(), relFiller.fill(), rankFiller.fill()];
                            // let promises = fillers.map(async (job) => await job);
                            // await Promise.all(promises);
                            break;
                    }
                } catch(e) {
                    console.warn('error in fetching data ' + e);
                }
            });
            await Promise.all(filling);
            console.log('Finished fetching data.')
        });
    }
}
module.exports = UpdateWesteros;