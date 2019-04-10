const CharacterFiller = require('./map/character');
const EpisodeFiller = require('./map/episode');
const RegionFiller = require('./map/region');

class UpdateMap {
    constructor(db) {
        this.db = db;

        this.characterFiller = new CharacterFiller(FILLER_POLICY_REFILL);
        this.episodeFiller = new EpisodeFiller(FILLER_POLICY_REFILL);
        this.regionFiller = new RegionFiller(FILLER_POLICY_REFILL);

        this.collections = [
            'mapcharacters',
            'mapepisodes',
            'mapregions',
        ];
    }

    async basicUpdate() {
        const self = this;

        console.log('[MapUpdater] '.green + 'filling map collections');
        let promises = this.collections.map(async(collection) => {
            console.log('[MapUpdater] '.green + 'checking ' + collection);
            try {
                switch(collection) {
                    case 'mapcharacters':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[MapUpdater] '.green + "filling " + collection);
                                    self.characterFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'mapepisodes':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[MapUpdater] '.green + "filling " + collection);
                                    self.episodeFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    case 'mapregions':
                        return new Promise((resolve => {
                            self.db.collection(collection).countDocuments(function (err, count) {
                                if(err) throw new Error(err);

                                if(count === 0) {
                                    console.log('[MapUpdater] '.green + "filling " + collection);
                                    self.regionFiller.fill().then(() => { resolve() });
                                } else {
                                    resolve();
                                }
                            });
                        }));
                    default:
                        console.error('[MapUpdater] '.green + "invalid collection " + collection);

                        return new Promise((resolve) => {resolve()});
                }
            } catch(e) {
                console.warn('[MapUpdater] '.green + 'error in fetching data ' + e);

                return new Promise((resolve) => {resolve()});
            }
        });

        // execute fillers without dependencies
        await Promise.all(promises);

        console.log('[MapUpdater] '.green + 'Finished fetching map data.');
    }
}

module.exports = UpdateMap;