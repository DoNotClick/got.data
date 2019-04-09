const MWBot = require('mwbot');
const cheerio = require('cheerio');
const jsonfile = require('jsonfile');

const CharactersScraper = require("./characters");

class CharacterLocationScraper {
    constructor()
    {
        this.bot = new MWBot({
            apiUrl: 'https://awoiaf.westeros.org/api.php'
        });

        this.characterscraper = new CharactersScraper();
    }

    async getAllCities()
    {
        let file = __appbase + '../data/cities.json';

        return new Promise(function (resolve, reject) {
            jsonfile.readFile(file, function(err, obj) {
                if(err) {
                    return reject();
                }

                console.log('[WesterosCharacterLocationScraper] '.green + 'Cities from  file "'+file+'". No scrapping.');

                let names = [];

                for(let i = 0; i < obj.length; i++)
                {
                    if(obj[i].name !== undefined && obj[i].name.length > 0)
                    {
                        names.push(obj[i]["name"])
                    }
                }

                resolve(names);
            });
        });
    }

    async getAll()
    {
        console.log('[WesterosCharacterLocationScraper] '.green + "fetching cities from db");

        let cityNames = await this.getAllCities();

        console.log('[WesterosCharacterLocationScraper] '.green + "fetching all character names from wiki");
        let characters = await this.characterscraper.getAllNames();

        let result = [];

        console.log('[WesterosCharacterLocationScraper] '.green + "started fetching all character locations");
        for(let i = 0; i < characters.length; i++)
        {
            try {
                result.push(await this.get(characters[i], cityNames));
            }
            catch (e) {
                console.warn('[WesterosCharacterLocationScraper] '.green + e);
            }
        }

        return result;
    }
    
    async get(characterName, locationNames)
    {
        if(!characterName){
            console.log('[WesterosCharacterLocationScraper] '.green + "Skipped: " + characterName);

            return null;
        }

        // console.log("scraping " + characterName);

        let pageName = characterName.replace(/\s/g, "_");
        let data = await this.bot.request({
            action: "parse",
            page: pageName,
            format: "json",
            redirects: ""
        });

        let character = {};
        let body = data.parse.text["*"];
        let locationHits = [];

        for(let i = 0; i < locationNames.length; i++)
        {
            if(body.indexOf(locationNames[i]) > -1) {
                locationHits.push(locationNames[i]);
            }
        }

        character.name = characterName;
        character.slug = pageName;
        character.locations = locationHits;

        // console.log("Fetched " + character.name);
        console.log('[WesterosCharacterLocationScraper] '.green + "scraped locations " + character.locations);

        return character;
    }
}

module.exports = CharacterLocationScraper;