const MWBot = require('mwbot');
const cheerio = require('cheerio');


class AgeScraper {
    constructor() {
        this.bot = new MWBot({
            apiUrl: 'https://gameofthrones.fandom.com/api.php'
        });
    }

    async getAllNames() {
        let data = await this.bot.request({
            action: "parse",
            format: "json",
            page: "Game_of_Thrones_(TV_series)"
        });

        const $ = cheerio.load(data["parse"]["text"]["*"]);

        let names = [];

        $("#Cast").parent().nextUntil("h2").each(function () {
            let $this = $(this);

            if($this[0]["name"] !== "ul")
            {
                return true;
            }

            $this.find("li").each(function () {
                let parts = $(this).html().split(" as ");
                let info = {"character": {"name": null, "wiki": null}, "actor": {"name": null, "wiki": null}};

                if(parts.length < 2)
                {
                    return true;
                }

                let $actor = $("<div>" + parts[0] + "</div>").find("a");
                let $character = $("<div>" + parts[1] + "</div>").find("a");

                info["actor"]["name"] = $($actor[0]).text();
                info["actor"]["slug"] = decodeURIComponent($($actor[0]).attr("href").replace("/wiki/", ""));

                info["character"]["name"] = $($character[0]).text();
                info["character"]["slug"] = decodeURIComponent($($character[0]).attr("href").replace("/wiki/", ""));

                names.push(info);
            });

        });

        return names;
    }

    async scrapeAll() {
        let names = await this.getAllNames();
        let data = [];

        for(let i = 0; i < names.length; i++)
        {
            let character = names[i]["character"];
            let age = names[i]["actor"];

            console.log('[FandomAgeScraper] '.green + "scraping", character["name"], "(", (i + 1), "/", names.length, ")");

            try {
                data.push(await this.scrape(character["name"], age["slug"]));
            }
            catch (e) {
                console.warn('[FandomAgeScraper] '.green + e);
            }
        }
        return data;
    }

    async scrape(name, page) {
        let data = await this.bot.request({
            action: "parse",
            format: "json",
            page: page
        });

        const $ = cheerio.load(data["parse"]["text"]["*"]);

        let ageItem = {};

        ageItem.name = name;

        let $infobox = $(".portable-infobox");

        let dateofbirth;

        if($('div[data-source=dateofbirth]') != null) {
            dateofbirth = $('div[data-source=dateofbirth]').find(".pi-data-value").text().match(/(.{4})\s*$/g);
        }

        let d = new Date();
        let n = d.getFullYear();

        ageItem.age = n - parseInt(dateofbirth);

        // console.log(ageItem.age);

        return ageItem;
    }
}


module.exports = AgeScraper;