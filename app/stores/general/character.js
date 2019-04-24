const CharactersFandom = require('../../models/fandom/character');

const FandomCharacterStore = require('../../stores/fandom/character');
const WesterosCharacterStore = require('../../stores/westeros/character');

class CharacterStore {
    constructor() {
        this.fandomCharacterStore = new FandomCharacterStore();
        this.westerosCharacterStore = new WesterosCharacterStore();

        this.cache = {
            'updated': 0,
            'book': [],
            'show': []
        };

        this.updateCache();
    }

    async getAll() {
        this.updateCache();

        return {
            'success': STORE_RESPONSE_SUCCESS,
            'book': this.cache.book,
            'show': this.cache.show
        };
    }

    async getByName(name) {
        this.updateCache();

        let bookcharacers = this.cache.book.filter(function (character) {
            return character['name'] === name;
        });

        let showcharacers = this.cache.show.filter(function (character) {
            return character['name'] === name;
        });

        if(bookcharacers.length === 0 && showcharacers.length === 0) {
            return {
                success: 0,
                message: 'getByName(name): Result empty'
            };
        } else {
            return {
                success: 1,
                book: bookcharacers.length > 0 ? bookcharacers[0] : null,
                show: showcharacers.length > 0 ? showcharacers[0] : null
            };
        }
    }

    async getBySlug(slug) {
        this.updateCache();

        let bookcharacers = this.cache.book.filter(function (character) {
            return character['slug'] === slug;
        });

        let showcharacers = this.cache.show.filter(function (character) {
            return character['slug'] === slug;
        });

        if(bookcharacers.length === 0 && showcharacers.length === 0) {
            return {
                success: 0,
                message: 'getBySlug(slug): Result empty'
            };
        } else {
            return {
                success: 1,
                book: bookcharacers.length > 0 ? bookcharacers[0] : null,
                show: showcharacers.length > 0 ? showcharacers[0] : null
            };
        }
    }

    async getByHouse(house) {
        this.updateCache();

        let bookcharacers = this.cache.book.filter(function (character) {
            return character['house'] === house;
        });

        let showcharacers = this.cache.show.filter(function (character) {
            return character['house'] === house;
        });

        if(bookcharacers.length === 0 && showcharacers.length === 0) {
            return {
                success: 0,
                message: 'getByHouse(house): Result empty'
            };
        } else {
            return {
                success: 1,
                book: bookcharacers.length > 0 ? bookcharacers[0] : null,
                show: showcharacers.length > 0 ? showcharacers[0] : null
            };
        }
    }

    async updateCache() {
        if(this.cache.updated + 5 * 60 * 1000 > Date.now()) {
            return;
        }

        let data = await Promise.all([this.fandomCharacterStore.getAll(), this.westerosCharacterStore.getAll()]);

        let fandomcharacters = data[0];
        let westeroscharacters = data[1];

        let fieldBlacklist = ['id', '_id', '__v', 'createdAt', 'updatedAt'];

        if(fandomcharacters.success === STORE_RESPONSE_SUCCESS && westeroscharacters.success === STORE_RESPONSE_SUCCESS) {
            // filter and map fandom characters
            fandomcharacters = fandomcharacters.data.filter(function (e) {
                if(e['plodB'] || e['plodC']) {
                    return true;
                }

                if(!e['pagerank'] || e['pagerank']['rank'] < 25) {
                    return false;
                }

                return true;
            });

            let fandom_slugs = [];
            let fandom_indicies = [];

            for(let i = 0; i < fandomcharacters.length; i++) {
                fandom_slugs.push(fandomcharacters[i]['slug']);
                fandom_indicies.push(i);
            }

            for(let i = 0; i < fandomcharacters.length; i++) {
                for(let n = 0; n < fandomcharacters[i]["related"].length; n++) {
                    let index = fandom_slugs.indexOf(fandomcharacters[i]['related'][n]['slug']);

                    if(index === -1) {
                        fandomcharacters[i]['related'][n] = null;
                    } else {
                        fandomcharacters[i]['related'][n] = {
                            'alive': fandomcharacters[index]['alive'],
                            'img': !!fandomcharacters[index]['image'],

                            'name': fandomcharacters[i]['related'][n]['name'],
                            'slug': fandomcharacters[i]['related'][n]['slug'],
                            'mentions': fandomcharacters[i]['related'][n]['mentions']
                        };
                    }
                }
            }

            fandomcharacters = JSON.parse(JSON.stringify(fandomcharacters)).map(function (character) {
                let obj = {};

                for(let attr in character) {
                    if(character.hasOwnProperty(attr) && fieldBlacklist.indexOf(attr) === -1) {
                        obj[attr] = character[attr];
                    }
                }

                obj['related'] = obj['related'].filter(function (e) {
                    return e !== null;
                });

                let relations_sort_mentions = obj['related'].sort(function (a, b) {
                    return b['mentions'] - a['mentions'];
                }).slice(0);

                let relations_sort_alive = obj['related'].sort(function (a, b) {
                    return b['alive'] - a['alive'];
                }).slice(0);

                obj['related'] = relations_sort_mentions.slice(0, 20).concat(relations_sort_alive.slice(0, 20));

                // filter duplicates
                obj['related'] = obj['related'].filter(function (item, pos) {
                    for(let i = 0; i < pos; i++) {
                        if(obj['related'][i]['slug'] === item['slug']) {
                            return false;
                        }
                    }

                    return true;
                });

                // sort by mentions again
                obj['related'].sort(function (a, b) {
                    return b['mentions'] - a['mentions'];
                });

                return obj;
            });

            // filter and mao westeros characters
            westeroscharacters = westeroscharacters.data.filter(function (e) {
                if(e['plodB'] || e['plodC']) {
                    return true;
                }

                if(!e['pagerank'] || e['pagerank']['rank'] < 50) {
                    return false;
                }

                return true;
            });

            westeroscharacters = JSON.parse(JSON.stringify(westeroscharacters)).map(function (character) {
                let obj = {};

                for(let attr in character) {
                    if(character.hasOwnProperty(attr) && fieldBlacklist.indexOf(attr) === -1) {
                        obj[attr] = character[attr];
                    }
                }

                return obj;
            });

            this.cache = {
                'updated': Date.now(),
                'book': westeroscharacters,
                'show': fandomcharacters
            };
        } else {
            console.error('failed to cache characters');
        }
    }
}

module.exports = CharacterStore;
