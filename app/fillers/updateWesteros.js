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

        this.filler = {
            'westerosages': new AgeFiller(FILLER_POLICY_REFILL),
            'westeroscities': new CityFiller(FILLER_POLICY_REFILL),
            'westeroshouses': new HouseFiller(FILLER_POLICY_REFILL),
            'westeroscharacters': new CharacterFiller(FILLER_POLICY_REFILL),
            'westeroscharacterlocations': new CharacterLocationFiller(FILLER_POLICY_REFILL),
            'westeroscharacterpaths': new CharacterPathFiller(FILLER_POLICY_REFILL),
            'westerosevents': new EventFiller(FILLER_POLICY_REFILL),
            'westerospageranks': new RankFiller(FILLER_POLICY_REFILL),
            'westerosregions': new RegionFiller(FILLER_POLICY_REFILL),
            'westeroscultures': new CultureFiller(FILLER_POLICY_REFILL),
            'westeroscontinents': new ContinentFiller(FILLER_POLICY_REFILL),
        };

        this.characterImageFiller = new CharacterImageFiller(FILLER_POLICY_REFILL);

        this.collections = [
            'westerosages', 'westeroscities', 'westeroshouses', 'westeroscharacters', 'westeroscharacterlocations',
            'westeroscharacterpaths', 'westerosevents', 'westerospageranks', 'westerosregions', 'westeroscultures',
            'westeroscontinents'
        ];
    }

    async basicUpdate() {
        const self = this;

        console.log('[WesterosUpdater] '.green + 'filling book collections');
        let promises = this.collections.map(async(collection) => {
            console.log('[WesterosUpdater] '.green + 'checking ' + collection);

            return new Promise((resolve => {
                self.db.collection(collection).countDocuments(function (err, count) {
                    if(err) throw new Error(err);

                    if(count === 0) {
                        console.log('[WesterosUpdater] '.green + 'filling ' + collection);
                        self.filler[collection].fill().then(() => {
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                });
            }));
        });

        // execute fillers without dependencies
        await Promise.all(promises);

        // execute fillers with dependencies
        promises = [];

        promises.push(new Promise(resolve => {
            console.log('[WesterosUpdater] '.green + 'checking images');

            try {
                let fs = require('fs');
                let imgDir = __dirname + '/../../misc/images/book/';

                fs.readdir(imgDir, (err, files) => {
                    if(err) throw new Error(err);

                    if(!files || files.length <= 2) {
                        console.log('[WesterosUpdater] '.green + 'downloading show character images');

                        self.characterImageFiller.fill().then(() => {
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                });
            } catch(e) {
                console.warn('[FandomUpdater] '.green + e);
            }
        }));

        await Promise.all(promises);

        console.log('[WesterosUpdater] '.green + 'Finished fetching book data.');
    }
}

module.exports = UpdateWesteros;