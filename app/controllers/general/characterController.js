const CharacterStore = require('../../stores/general/character');

class CharacterController {
    constructor() {
        this.charStore = new CharacterStore();
    }

    /**
     * @api {get} /api/general/characters Get all characters
     * @apiVersion 0.0.2
     * @apiName GetAllCharactersGeneral
     * @apiGroup CharacterGeneral
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"success":1,"book":[{"titles":["Lord Commander of the Night's Watch"],"spouse":[],"children":[],"allegiance":["House Stark","Night's Watch"],"books":["A Game of Thrones","A Clash of Kings","A Storm of Swords","A Feast for Crows","A Dance with Dragons"],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"name":"Jon Snow","slug":"Jon_Snow","gender":"male","image":"https://awoiaf.westeros.org/thumb.php?f=Cristi_Balanescu_Jon_SnowGhost.png&width=300","culture":"Northmen","house":"House Stark","birth":283,"alive":true,"pagerank":{"title":"Jon_Snow","rank":1507}}],"show":[{"titles":["Warden","King in the North","Lord Commander of the Night's Watch"],"origin":["Tower of Joy","Winterfell"],"siblings":["Rhaenys Targaryen ","Aegon Targaryen ","Robb Stark","Sansa Stark","Arya Stark","Bran Stark","Rickon Stark"],"spouse":[],"lovers":["Daenerys Targaryen","Ygritte"],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"culture":["Northmen"],"religion":["Old Gods of the Forest"],"allegiances":["House Stark"],"seasons":[],"appearances":["Winter Is Coming"],"name":"Jon Snow","slug":"Jon_Snow","image":"https://vignette.wikia.nocookie.net/gameofthrones/images/d/d3/JonSnowSeason8HB.jpg/revision/latest/scale-to-width-down/333?cb=20190401173347","gender":"male","alive":true,"birth":281,"mother":"Lyanna Stark","father":"Rhaegar Targaryen","house":"House Stark","first_seen":"Winter is Coming\"","actor":"Kit Harington","related":[{"alive":true,"name":"Sansa Stark","slug":"Sansa_Stark","mentions":95},{"alive":false,"name":"Mance Rayder","slug":"Mance_Rayder","mentions":91}],"pagerank":{"title":"Jon_Snow","rank":1775},"age":{"name":"Jon Snow","age":33}}]}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"success":1,"book":[],"show":[]}
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 200
     *      {"success":0,"message":"error in database query! - err"}
     * @apiDescription Return all characters currently stored.
     */
    async getAll(req, res) {
        let characters = await this.charStore.getAll();

        res.status(200).send(characters);
    }

    /**
     * @api {get} /api/general/characters/:name Get characters by name
     * @apiVersion 0.0.2
     * @apiName GetCharactersByNameGeneral
     * @apiGroup CharacterGeneral
     *
     * @apiSuccessExample {json} Success-Response
     *    HTTP/1.1 200 OK
     *    {"success":1,"book":{"titles":["Lord Commander of the Night's Watch"],"spouse":[],"children":[],"allegiance":["House Stark","Night's Watch"],"books":["A Game of Thrones","A Clash of Kings","A Storm of Swords","A Feast for Crows","A Dance with Dragons"],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"name":"Jon Snow","slug":"Jon_Snow","gender":"male","image":"https://awoiaf.westeros.org/thumb.php?f=Cristi_Balanescu_Jon_SnowGhost.png&width=300","culture":"Northmen","house":"House Stark","birth":283,"alive":true,"pagerank":{"title":"Jon_Snow","rank":1507}},"show":{"titles":["Warden","King in the North","Lord Commander of the Night's Watch"],"origin":["Tower of Joy","Winterfell"],"siblings":["Rhaenys Targaryen ","Aegon Targaryen ","Robb Stark","Sansa Stark","Arya Stark","Bran Stark","Rickon Stark"],"spouse":[],"lovers":["Daenerys Targaryen","Ygritte"],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"culture":["Northmen"],"religion":["Old Gods of the Forest"],"allegiances":["House Stark"],"seasons":[],"appearances":["Winter Is Coming"],"name":"Jon Snow","slug":"Jon_Snow","image":"https://vignette.wikia.nocookie.net/gameofthrones/images/d/d3/JonSnowSeason8HB.jpg/revision/latest/scale-to-width-down/333?cb=20190401173347","gender":"male","alive":true,"birth":281,"mother":"Lyanna Stark","father":"Rhaegar Targaryen","house":"House Stark","first_seen":"Winter is Coming\"","actor":"Kit Harington","related":[{"alive":true,"name":"Sansa Stark","slug":"Sansa_Stark","mentions":95},{"alive":false,"name":"Mance Rayder","slug":"Mance_Rayder","mentions":91}],"pagerank":{"title":"Jon_Snow","rank":1775},"age":{"name":"Jon Snow","age":33}}}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"success":1,"book":null,"show":null}
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 200
     *      {"success":0,"message":"getByName(name): Result empty"}
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 200
     *      {"success":0,"message":"error in database query! - err"}
     * @apiDescription Return characters named :name.
     */
    async getByName(req, res) {
        let characters = await this.charStore.getByName(req.params.name);

        res.status(200).send(characters);
    }

    /**
     * @api {get} /api/general/characters/bySlug/:slug Get characters by slug
     * @apiVersion 0.0.2
     * @apiName GetCharactersBySlugGeneral
     * @apiGroup CharacterGeneral
     *
     * @apiSuccessExample {json} Success-Response
     *    HTTP/1.1 200 OK
     *    {"success":1,"book":{"titles":["Lord Commander of the Night's Watch"],"spouse":[],"children":[],"allegiance":["House Stark","Night's Watch"],"books":["A Game of Thrones","A Clash of Kings","A Storm of Swords","A Feast for Crows","A Dance with Dragons"],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"name":"Jon Snow","slug":"Jon_Snow","gender":"male","image":"https://awoiaf.westeros.org/thumb.php?f=Cristi_Balanescu_Jon_SnowGhost.png&width=300","culture":"Northmen","house":"House Stark","birth":283,"alive":true,"pagerank":{"title":"Jon_Snow","rank":1507}},"show":{"titles":["Warden","King in the North","Lord Commander of the Night's Watch"],"origin":["Tower of Joy","Winterfell"],"siblings":["Rhaenys Targaryen ","Aegon Targaryen ","Robb Stark","Sansa Stark","Arya Stark","Bran Stark","Rickon Stark"],"spouse":[],"lovers":["Daenerys Targaryen","Ygritte"],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"culture":["Northmen"],"religion":["Old Gods of the Forest"],"allegiances":["House Stark"],"seasons":[],"appearances":["Winter Is Coming"],"name":"Jon Snow","slug":"Jon_Snow","image":"https://vignette.wikia.nocookie.net/gameofthrones/images/d/d3/JonSnowSeason8HB.jpg/revision/latest/scale-to-width-down/333?cb=20190401173347","gender":"male","alive":true,"birth":281,"mother":"Lyanna Stark","father":"Rhaegar Targaryen","house":"House Stark","first_seen":"Winter is Coming\"","actor":"Kit Harington","related":[{"alive":true,"name":"Sansa Stark","slug":"Sansa_Stark","mentions":95},{"alive":false,"name":"Mance Rayder","slug":"Mance_Rayder","mentions":91}],"pagerank":{"title":"Jon_Snow","rank":1775},"age":{"name":"Jon Snow","age":33}}}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"success":1,"book":null,"show":null}
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 200
     *      {"success":0,"message":"getBySlug(slug): Result empty"}
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 200
     *      {"success":0,"message":"error in database query! - err"}
     * @apiDescription Return characters with slug :slug.
     */
    async getBySlug(req, res) {
        let characters = await this.charStore.getBySlug(req.params.slug);

        res.status(200).send(characters);
    }

    /**
     * @api {get} /api/general/characters/byHouse/:house Get characters by house
     * @apiVersion 0.0.2
     * @apiName GetCharactersByHouseGeneral
     * @apiGroup CharacterGeneral
     *
     * @apiSuccessExample {json} Success-Response
     *    HTTP/1.1 200 OK
     *    {"success":1,"book":{"titles":["Lord Commander of the Night's Watch"],"spouse":[],"children":[],"allegiance":["House Stark","Night's Watch"],"books":["A Game of Thrones","A Clash of Kings","A Storm of Swords","A Feast for Crows","A Dance with Dragons"],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"name":"Jon Snow","slug":"Jon_Snow","gender":"male","image":"https://awoiaf.westeros.org/thumb.php?f=Cristi_Balanescu_Jon_SnowGhost.png&width=300","culture":"Northmen","house":"House Stark","birth":283,"alive":true,"pagerank":{"title":"Jon_Snow","rank":1507}},"show":{"titles":["Warden","King in the North","Lord Commander of the Night's Watch"],"origin":["Tower of Joy","Winterfell"],"siblings":["Rhaenys Targaryen ","Aegon Targaryen ","Robb Stark","Sansa Stark","Arya Stark","Bran Stark","Rickon Stark"],"spouse":[],"lovers":["Daenerys Targaryen","Ygritte"],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"culture":["Northmen"],"religion":["Old Gods of the Forest"],"allegiances":["House Stark"],"seasons":[],"appearances":["Winter Is Coming"],"name":"Jon Snow","slug":"Jon_Snow","image":"https://vignette.wikia.nocookie.net/gameofthrones/images/d/d3/JonSnowSeason8HB.jpg/revision/latest/scale-to-width-down/333?cb=20190401173347","gender":"male","alive":true,"birth":281,"mother":"Lyanna Stark","father":"Rhaegar Targaryen","house":"House Stark","first_seen":"Winter is Coming\"","actor":"Kit Harington","related":[{"alive":true,"name":"Sansa Stark","slug":"Sansa_Stark","mentions":95},{"alive":false,"name":"Mance Rayder","slug":"Mance_Rayder","mentions":91}],"pagerank":{"title":"Jon_Snow","rank":1775},"age":{"name":"Jon Snow","age":33}}}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"success":1,"book":null,"show":null}
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 200
     *      {"success":0,"message":"getByHouse(house): Result empty"}
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 200
     *      {"success":0,"message":"error in database query! - err"}
     * @apiDescription Return characters with house :house.
     */
    async getByHouse(req, res) {
        let characters = await this.charStore.getByHouse(req.params.house);

        res.status(200).send(characters);
    }
}

module.exports = CharacterController;