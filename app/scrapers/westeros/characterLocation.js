const MWBot = require('mwbot');
const cheerio = require('cheerio');
const jsonfile = require('jsonfile');

const CharactersScraper = require('./character');

class CharacterLocationScraper {
    constructor() {
        this.bot = new MWBot({
            apiUrl: WESTEROS_API_URL
        });

        this.characterscraper = new CharactersScraper();
    }

    async getAllCities() {
        let file = __appbase + '../data/cities.json';

        return new Promise(function (resolve, reject) {
            jsonfile.readFile(file, function (err, obj) {
                if(err) {
                    return reject();
                }

                console.log('[WesterosCharacterLocationScraper] '.green + 'Cities from  file "' + file + '". No scrapping.');

                let names = [];

                for(let i = 0; i < obj.length; i++) {
                    if(obj[i].name !== undefined && obj[i].name.length > 0) {
                        names.push(obj[i]['name']);
                    }
                }

                resolve(names);
            });
        });
    }

    async getAll() {
        console.log('[WesterosCharacterLocationScraper] '.green + 'fetching cities from db');

        let cityNames = await this.getAllCities();

        console.log('[WesterosCharacterLocationScraper] '.green + 'fetching all character names from wiki');
        let characters = await this.characterscraper.getAllNames();

        let result = [];

        console.log('[WesterosCharacterLocationScraper] '.green + 'started fetching all character locations');
        for(let i = 0; i < characters.length; i++) {
            try {
                result.push(await this.get(characters[i]['slug'], characters[i]['name'], cityNames));
            } catch(e) {
                if(e.code === 'invalidjson') {
                    i -= 1;

                    continue;
                }

                console.warn('[WesterosCharacterLocationScraper] '.green + e);
            }
        }

        return result;
    }

    async get(characterSlug, characterName, locationNames) {
        if(!characterName) {
            console.log('[WesterosCharacterLocationScraper] '.green + 'Skipped: ' + characterName);

            return null;
        }

        console.log('[WesterosCharacterLocationScraper] '.green + 'scraping ' + characterName);

        let data = await this.bot.request({
            action: 'parse',
            page: characterSlug,
            format: 'json',
            redirects: ''
        });

        let character = {};
        let body = data.parse.text['*'];
        let locationHits = [];

        for(let i = 0; i < locationNames.length; i++) {
            if(body.indexOf(locationNames[i]) > -1) {
                locationHits.push(locationNames[i]);
            }
        }

        character.name = characterName;
        character.slug = characterSlug;
        character.locations = locationHits;

        console.log('[WesterosCharacterLocationScraper] '.green + 'scraped locations ' + character.locations);

        return character;
    }
}

module.exports = CharacterLocationScraper;