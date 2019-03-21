const MWBot = require('mwbot');
const cheerio = require('cheerio');
const Scraper = require("../scraper");

class CultureScraper extends Scraper {
    constructor()
    {
        super();

        this.bot = new MWBot({
            apiUrl: 'https://awoiaf.westeros.org/api.php'
        });
    }

    async getAll()
    {
        console.log("start getAll");

        let data = await this.bot.request({
            action: "parse",
            page: "Portal:Culture",
            format: "json"
        });
        
        let cultures = [];

        let allData = data.parse.text["*"];
        let result = allData.match(/<tr>(.|\n)*?<\/tr>/g);

        let listForSevenKingdomsAndAncientTimes, listForBeyondTheWallAndEssos;

        listForSevenKingdomsAndAncientTimes = result[3].match(/title="([^"]*)"/g);
        listForBeyondTheWallAndEssos = result[5].match(/title="([^"]*)"/g);

        for (let i = 0; i < listForSevenKingdomsAndAncientTimes.length; i++) {
            let culture = {};
            listForSevenKingdomsAndAncientTimes[i] = listForSevenKingdomsAndAncientTimes[i].replace(/title=/g, '');
            listForSevenKingdomsAndAncientTimes[i] = listForSevenKingdomsAndAncientTimes[i].replace(/"/g, '');
            culture.name = listForSevenKingdomsAndAncientTimes[i];
            cultures.push(culture);
        }

        for (let i = 0; i < listForBeyondTheWallAndEssos.length; i++) {
            let culture = {};
            listForBeyondTheWallAndEssos[i] = listForBeyondTheWallAndEssos[i].replace(/title=/g, '');
            listForBeyondTheWallAndEssos[i] = listForBeyondTheWallAndEssos[i].replace(/"/g, '');
            culture.name = listForBeyondTheWallAndEssos[i];
            cultures.push(culture);
        }

        return cultures;
    }
}

module.exports = CultureScraper;