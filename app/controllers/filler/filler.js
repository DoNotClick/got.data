
const fandomTranslation = {
    "age": "ageFandom",
    "animal": "animalFandom",
    "assassin": "assassinFandom",
    "bastard": "bastardFandom",
    "battle": "battleFandom",
    "castle": "castleFandom",
    "character": "charactersFandom",
    "characterImage": "characterImages",
    "city": "cityFandom",
    "episode": "episodesFandom",
    "event": "eventFandom",
    "house": "houseFandom",
    "pagerank": "pagerankFandom",
    "region": "regionFandom",
    "religion": "religionsFandom",
    "town": "townFandom",
};

const westerosTranslation = {
    "age": "ages",
    "characterImage": "characterImages",
    "characterLocation": "characterLocations",
    "characterPath": "characterPaths",
    "character": "characters",
    "city": "cities",
    "continent": "continents",
    "culture": "cultures",
    "event": "events",
    "house": "houses",
    "pagerank": "pagerank",
    "region": "regions",
};

const localTranslation = {
    "character": "map/characterMap",
    "episode": "map/episodeMap",
    "region": "map/regionMap",
};

class Filler {
    constructor(wiki, collection, mode)
    {
        let fclass = null;

        if(wiki === "fandom")
        {
            if(typeof fandomTranslation[collection] === "string")
            {
                fclass = require("./fandom/" + fandomTranslation[collection]);
            }
        }
        else if(wiki === "local")
        {
            if(typeof localTranslation[collection] === "string")
            {
                fclass = require("./" + localTranslation[collection]);
            }
        }
        else
        {
            if(typeof westerosTranslation[collection] === "string")
            {
                fclass = require("./westeros/" + westerosTranslation[collection]);
            }
        }

        if(fclass === null)
        {
            throw Error("invalid collection: " + collection)
        }

        this.filler = new fclass(mode);
    }

    async fill()
    {
        return await this.filler.fill();
    }
}

module.exports = Filler;