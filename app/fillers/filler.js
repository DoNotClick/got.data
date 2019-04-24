const fandomTranslation = {
    'age': 'age',
    'animal': 'animal',
    'assassin': 'assassin',
    'bastard': 'bastard',
    'battle': 'battle',
    'castle': 'castle',
    'character': 'character',
    'characterImage': 'characterImage',
    'city': 'city',
    'episode': 'episodes',
    'event': 'event',
    'house': 'house',
    'pagerank': 'pagerank',
    'region': 'region',
    'religion': 'religions',
    'town': 'town'
};

const westerosTranslation = {
    'age': 'age',
    'characterImage': 'characterImage',
    'characterLocation': 'characterLocation',
    'characterPath': 'characterPath',
    'character': 'character',
    'city': 'city',
    'continent': 'continent',
    'culture': 'culture',
    'event': 'event',
    'house': 'house',
    'pagerank': 'pagerank',
    'region': 'region'
};

const localTranslation = {
    'character': 'map/character',
    'episode': 'map/episode',
    'region': 'map/region'
};

class Filler {
    constructor(wiki, collection, mode) {
        let fclass = null;

        if(wiki === 'fandom') {
            if(typeof fandomTranslation[collection] === 'string') {
                fclass = require('./fandom/' + fandomTranslation[collection]);
            }
        } else if(wiki === 'local') {
            if(typeof localTranslation[collection] === 'string') {
                fclass = require('./' + localTranslation[collection]);
            }
        } else {
            if(typeof westerosTranslation[collection] === 'string') {
                fclass = require('./westeros/' + westerosTranslation[collection]);
            }
        }

        if(fclass === null) {
            throw Error('invalid collection: ' + collection);
        }

        this.filler = new fclass(mode);
    }

    async fill() {
        return await this.filler.fill();
    }
}

module.exports = Filler;