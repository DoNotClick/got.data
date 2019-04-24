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

        this.filler = {
            'fandomcharacters': new CharacterFiller(FILLER_POLICY_REFILL),
            'fandomages': new AgeFiller(FILLER_POLICY_REFILL),
            'fandomanimals': new AnimalFiller(FILLER_POLICY_REFILL),
            'fandomhouses': new HouseFiller(FILLER_POLICY_REFILL),
            'fandomassassins': new AssassinFiller(FILLER_POLICY_REFILL),
            'fandombastards': new BastardFiller(FILLER_POLICY_REFILL),
            'fandombattles': new BattleFiller(FILLER_POLICY_REFILL),
            'fandomcastles': new CastleFiller(FILLER_POLICY_REFILL),
            'fandomcities': new CityFiller(FILLER_POLICY_REFILL),
            'fandomevents': new EventFiller(FILLER_POLICY_REFILL),
            'fandomreligions': new ReligionFiller(FILLER_POLICY_REFILL),
            'fandomregions': new RegionFiller(FILLER_POLICY_REFILL),
            'fandomepisodes': new EpisodeFiller(FILLER_POLICY_REFILL),
            'fandomtowns': new TownFiller(FILLER_POLICY_REFILL),
            'fandompageranks': new PageRankFiller(FILLER_POLICY_REFILL),
        };

        this.characterImageFiller = new CharacterImageFiller(FILLER_POLICY_REFILL);

        this.collections = [
            'fandomcharacters', 'fandomages', 'fandomanimals', 'fandomhouses', 'fandomassassins', 'fandombastards',
            'fandombattles', 'fandomcastles', 'fandomcities', 'fandomevents', 'fandomreligions', 'fandomregions',
            'fandomepisodes', 'fandomtowns', 'fandompageranks'
        ];
    }

    async basicUpdate() {
        const self = this;

        console.log('[FandomUpdater] '.green + 'filling show collections');

        let promises = this.collections.map(async(collection) => {
            console.log('[FandomUpdater] '.green + 'checking ' + collection);

            return new Promise((resolve => {
                self.db.collection(collection).countDocuments(function (err, count) {
                    if(err) throw new Error(err);

                    if(count === 0) {
                        console.log('[FandomUpdater] '.green + 'filling ' + collection);
                        self.filler[collection].fill().then(() => {
                            resolve();
                        });
                    } else {
                        resolve();
                    }
                });
            }));
        });

        await Promise.all(promises);

        promises = [];
        // image updater
        promises.push(new Promise(resolve => {
            console.log('[FandomUpdater] '.green + 'checking images');

            try {
                let fs = require('fs');
                let imgDir = __dirname + '/../../misc/images/show/';
                fs.readdir(imgDir, (err, files) => {
                    if(err) throw new Error(err);
                    if(!files || files.length <= 2) {
                        console.log('[FandomUpdater] '.green + 'downloading show character images');

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

        console.log('[FandomUpdater] '.green + 'Finished fetching show data.');
    }
}

module.exports = UpdateFandom;