const MWBot = require('mwbot');
const cheerio = require('cheerio');


class CharacterScraper {
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

    async fixNameAnomalies(names) {

        for(let i = 0; i < names.length; i++)
        {
            let character = names[i]["character"];

            if(character["name"] == "Brienne") {
                character["slug"] = "Brienne_of_Tarth";
            }

            if(character["name"] == "Smalljon Umber") {
                character["slug"] = "Smalljon_Umber";
            }

            if(character["name"] == "Ramsay Snow") {
                character["slug"] = "Ramsay_Bolton";
            }

            if(character["name"] == "Tickler") {
                character["slug"] = "The_Tickler";
            }

            if(character["name"] == "Olenna Redwyne") {
                character["slug"] = "Olenna_Tyrell";
            }

            if(character["name"] == "Joyeuse Erenford") {
                character["slug"] = "Joyeuse_Frey";
            }

            if(character["name"] == "Black Walder Frey") {
                character["slug"] = "Walder_Rivers";
            }

            if(character["name"] == "Fat Walda Frey") {
                character["slug"] = "Walda_Bolton";
            }

            if(character["name"] == "Talisa Maegyr") {
                character["slug"] = "Talisa_Stark";
            }

            if(character["name"] == "Lem Lemoncloak") {
                character["slug"] = "Lem";
            }

            if(character["name"] == "Lommy Greenhands") {
                character["slug"] = "Lommy";
            }

            if(character["name"] == "Archmaester") {
                character["slug"] = "Archmaester_(Eastwatch)";
            }

            if(character["name"] == "Qhorin Halfhand") {
                character["slug"] = "Qhorin";
            }

            if(character["name"] == "Karl") {
                character["slug"] = "Karl_Tanner";
            }

            if(character["name"] == "Tormund Giantsbane") {
                character["slug"] = "Tormund";
            }

            if(character["name"] == "Night's King") {
                character["slug"] = "Night_King";
            }

            if(character["name"] == "Khal Drogo") {
                character["slug"] = "Drogo";
            }

            if(character["name"] == "The Waif") {
                character["slug"] = "Waif";
            }


        }

        return names;
    }

    async scrapeAll() {
        var names = await this.getAllNames();
        let finalNames = await this.fixNameAnomalies(names);

        let data = [];

        for(let i = 0; i < finalNames.length; i++)
        {
            let character = finalNames[i]["character"];



            if(character["name"] == "Brienne") {
                character["slug"] = "Brienne_of_Tarth";
            }

            console.log('[FandomCharacterScraper] '.green + "scraping", character["name"], "(", (i + 1), "/", finalNames.length, ")");

            data.push(await this.scrape(character["name"], character["slug"]));
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


        let result = {};

        // console.log("Scrape for" + name);

        result.name = name;
        result.slug = page;
        // scrape character image
        result.image = $(".pi-image-thumbnail").attr("src");

        var infobox = $(".portable-infobox");


        let genderCounter = $('p').slice(0,5).text();

        // scrape gender
        let male_counter = (genderCounter.match(/\shis\s|\shim\s|He|himself|son/g) || []).length;
        let female_counter = (genderCounter.match(/\sher\s|She|herself|daughter/g) || []).length;


        if(male_counter > female_counter) {
            result.gender = "male";
        }
        else
        {
            result.gender = "female";
        }


        // scrape appearance
        result.appearances = []

        var sliceEp = false;
        var lastEp = $('div[data-source=DeathEp]').find(".pi-data-value").text().replace(/\"/g, "").trim()
        
        // scrape appearances in episodes
        $(".appearances").each(function () {
            let $table = $(this);

            // skip if table is not for tv show
            if($table.text().search("Season") === -1)
            {
                return true;
            }

            if(sliceEp) {
                sliceEp = false;
                return false;
            }

            $table.find("td").each(function () {
                let $td = $(this);

                // skip if it is the header
                if($td.attr("colspan"))
                {
                    return true;
                }
                var episode = $td.text().trim()


                result.appearances.push(episode);

                if(episode == lastEp) {
                    sliceEp = true;
                    return false;
                }
            });
        });



        //Titles
        result.titles = []
        if($('div[data-source=Titles]') != null) {

            var titles = $('div[data-source=Titles]').find(".pi-data-value").html()

            if(titles != null) {
                titles = titles.match(/title="(.*?)"/g);

                if(titles) {
                    titles.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    result.titles.push(el);
                });
                }

                
            }

        }



        //Alive
        if($('div[data-source=Status]') != null) {
            result.alive = $('div[data-source=Status]').find(".pi-data-value").text().toLowerCase() !== "deceased"
        }



        //Birth
        if($('div[data-source=Birth]') != null) {
            result.birth = parseInt($('div[data-source=Birth]').find(".pi-data-value").text().replace(/\D/g,''));
        }

        


        //Death
        if($('div[data-source=Death]') != null) {
            var death = $('div[data-source=Death]').find(".pi-data-value").text();

            

            if(!death.toLowerCase().includes('resurrected')) {
                
                result.death = parseInt(death.replace(/\D/g,''))
            }
        }

        

        //Origin
        result.origin = []
        if($('div[data-source=Place]') != null) {

            var origin = $('div[data-source=Place]').find(".pi-data-value").html()

            if(origin != null) {
                origin = origin.match(/title="(.*?)"/g);

                if(origin) {
                    origin.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    result.origin.push(el);
                });
                }

                
            }

        }




        //Mother

         if($('div[data-source=Mother]') != null) {

            var mother = $('div[data-source=Mother]').find(".pi-data-value").html()

            if(mother != null) {
                mother = mother.match(/title="(.*?)"/g);

                if(mother) {
                    result.mother = mother[0].replace(/title=/g,'').replace(/"/g,'')
                }

                

                
            }

        }




        //Father

        if($('div[data-source=Father]') != null) {

            var father = $('div[data-source=Father]').find(".pi-data-value").html()

            if(father != null) {
                father = father.match(/title="(.*?)"/g);

                if(father) {
                    result.father = father[0].replace(/title=/g,'').replace(/"/g,'')
                }

                

                
            }

        }



        //Siblings
        result.siblings = []
        if($('div[data-source=Siblings]') != null) {

            var siblings = $('div[data-source=Siblings]').find(".pi-data-value").html()

            if(siblings != null) {
                siblings = siblings.match(/title="(.*?)"/g);

                if(siblings) {
                    siblings.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    result.siblings.push(el);
                });
                }

                
            }

        }



        //Lovers
        result.lovers = []
        if($('div[data-source=Lovers]') != null) {

            var lovers = $('div[data-source=Lovers]').find(".pi-data-value").html()

            if(lovers != null) {
                lovers = lovers.match(/title="(.*?)"/g);

                if(lovers) {
                    lovers.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    result.lovers.push(el);
                });
                }

                
            }

        }



        //Spouse
        result.spouse = []
        if($('div[data-source=Spouse]') != null) {

            var spouse = $('div[data-source=Spouse]').find(".pi-data-value").html()

            if(spouse != null) {
                spouse = spouse.match(/title="(.*?)"/g);

                if(spouse) {
                    spouse.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    result.spouse.push(el);
                });
                }

                
            }

        }



        //Culture
        if($('div[data-source=Culture]') != null) {
            result.culture = $('div[data-source=Culture]').find(".pi-data-value").text()
        }


        //Religion
        if($('div[data-source=Religion]') != null) {
            result.religion = $('div[data-source=Religion]').find(".pi-data-value").text()
        }




        //Allegiance
        result.allegiances = []
        if($('div[data-source=Allegiance]') != null) {

            var allegiance = $('div[data-source=Allegiance]').find(".pi-data-value").html()

            if(allegiance != null) {
                allegiance = allegiance.match(/title="(.*?)"/g);

                

                if(allegiance) {
                    result.house = allegiance[0].replace(/title=/g,'').replace(/"/g,'')
                    allegiance.forEach(function(element) {
                    var el = element.replace(/title=/g,'').replace(/"/g,'').replace(/\[\d+\]+/g, '').replace(/&apos;/g,"'").replace(/&amp;/g,"&").replace(/\([^()]*\)/g, '').replace(/&#x2020;/g,"&").replace(/[,].*/g, '');
                    result.allegiances.push(el);
                });
                }

                
            }

        }



        //First seen
        if($('div[data-source=First]') != null) {
            result.first_seen = $('div[data-source=First]').find(".pi-data-value").text()
        }


        //Seasons

        
        if($('div[data-source=Season]') != null) {

            result.seasons = $('div[data-source=Season]').find(".pi-data-value").text().split(',');
            //console.log(seasons);

            
        }

        

        //Actor

        if($('div[data-source=Actor]') != null) {

            var actor = $('div[data-source=Actor]').find(".pi-data-value").html()

            if(actor != null) {
                actor = actor.match(/title="(.*?)"/g);

                if(actor) {
                    result.actor = actor[0].replace(/title=/g,'').replace(/"/g,'')
                }
                

                
            }

        }

        return result;
    
    }
}

// sample characters output: https://pastebin.com/AByMyz0W

module.exports = CharacterScraper;
