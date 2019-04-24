const CharacterStore = require('../../stores/fandom/character');

class CharacterController {
    constructor() {
        this.charStore = new CharacterStore();
    }

    /**
     * @api {get} /api/show/characters Get all characters
     * @apiVersion 0.0.2
     * @apiName GetAllCharacterShow
     * @apiGroup CharacterShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"titles":["Lord of Winterfell","Lord Paramount of the North","Warden","The North","Hand of the King","Robert Baratheon","Joffrey Baratheon","Regent","Joffrey Baratheon","Protector of the Realm","Joffrey Baratheon"],"origin":["Winterfell","The Eyrie"],"siblings":["Brandon Stark ","Lyanna Stark","Benjen Stark"],"spouse":["Catelyn Tully"],"lovers":[],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"culture":["Northmen"],"religion":["Old Gods of the Forest"],"allegiances":["House Stark","House Baratheon of King's Landing"],"seasons":[],"appearances":["Winter Is Coming","The Kingsroad","Lord Snow","Cripples, Bastards, and Broken Things","The Wolf and the Lion","A Golden Crown","You Win or You Die","The Pointy End","Baelor"],"_id":"5cad9840b0c0ef00108e6529","name":"Eddard Stark","slug":"Eddard_Stark","image":"https://vignette.wikia.nocookie.net/gameofthrones/images/3/37/Eddard_Stark_infobox_new.jpg/revision/latest/scale-to-width-down/323?cb=20160730050722","gender":"male","alive":false,"death":298,"father":"Rickard Stark","house":"House Stark","first_seen":"Winter Is Coming\"","actor":"Sean Bean","createdAt":"2019-04-10T07:16:16.773Z","updatedAt":"2019-04-10T07:16:16.773Z","__v":0,"pagerank":{"title":"Eddard_Stark","rank":1133},"age":{"name":"Eddard Stark","age":60},"related":[{"_id":"5cb7137e8b32d4b573ec92be","name":"Eddard Stark","slug":"Eddard_Stark","mentions":14}],"id":"5cad9840b0c0ef00108e6529"},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Character collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all characters currently stored.
     */
    async getAll(req, res) {
        let characters = await this.charStore.getAll();
        if(characters.success === STORE_RESPONSE_SUCCESS) {
            return res.status(200).send(characters.data);
        } else {
            return res.status(404).send(characters.message);
        }
    }

    /**
     * @api {get} /api/show/characters/:name Get characters by name
     * @apiVersion 0.0.2
     * @apiName GetCharactersByNameShow
     * @apiGroup CharacterShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"titles":["Lord of Winterfell","Lord Paramount of the North","Warden","The North","Hand of the King","Robert Baratheon","Joffrey Baratheon","Regent","Joffrey Baratheon","Protector of the Realm","Joffrey Baratheon"],"origin":["Winterfell","The Eyrie"],"siblings":["Brandon Stark ","Lyanna Stark","Benjen Stark"],"spouse":["Catelyn Tully"],"lovers":[],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"culture":["Northmen"],"religion":["Old Gods of the Forest"],"allegiances":["House Stark","House Baratheon of King's Landing"],"seasons":[],"appearances":["Winter Is Coming","The Kingsroad","Lord Snow","Cripples, Bastards, and Broken Things","The Wolf and the Lion","A Golden Crown","You Win or You Die","The Pointy End","Baelor"],"_id":"5cad9840b0c0ef00108e6529","name":"Eddard Stark","slug":"Eddard_Stark","image":"https://vignette.wikia.nocookie.net/gameofthrones/images/3/37/Eddard_Stark_infobox_new.jpg/revision/latest/scale-to-width-down/323?cb=20160730050722","gender":"male","alive":false,"death":298,"father":"Rickard Stark","house":"House Stark","first_seen":"Winter Is Coming\"","actor":"Sean Bean","createdAt":"2019-04-10T07:16:16.773Z","updatedAt":"2019-04-10T07:16:16.773Z","__v":0,"pagerank":{"title":"Eddard_Stark","rank":1133},"age":{"name":"Eddard Stark","age":60},"related":[{"_id":"5cb7137e8b32d4b573ec92be","name":"Eddard Stark","slug":"Eddard_Stark","mentions":14}],"id":"5cad9840b0c0ef00108e6529"}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return characters named :name.
     */
    async getByName(req, res) {
        let characters = await this.charStore.getByName(req.params.name);
        if(characters.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(characters.data);
        } else {
            res.status(404).send(characters.message);
        }
    }

    /**
     * @api {get} /api/show/characters/bySlug/:slug Get characters by slug
     * @apiVersion 0.0.2
     * @apiName GetCharactersBySlugShow
     * @apiGroup CharacterShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"titles":["Lord of Winterfell","Lord Paramount of the North","Warden","The North","Hand of the King","Robert Baratheon","Joffrey Baratheon","Regent","Joffrey Baratheon","Protector of the Realm","Joffrey Baratheon"],"origin":["Winterfell","The Eyrie"],"siblings":["Brandon Stark ","Lyanna Stark","Benjen Stark"],"spouse":["Catelyn Tully"],"lovers":[],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"culture":["Northmen"],"religion":["Old Gods of the Forest"],"allegiances":["House Stark","House Baratheon of King's Landing"],"seasons":[],"appearances":["Winter Is Coming","The Kingsroad","Lord Snow","Cripples, Bastards, and Broken Things","The Wolf and the Lion","A Golden Crown","You Win or You Die","The Pointy End","Baelor"],"_id":"5cad9840b0c0ef00108e6529","name":"Eddard Stark","slug":"Eddard_Stark","image":"https://vignette.wikia.nocookie.net/gameofthrones/images/3/37/Eddard_Stark_infobox_new.jpg/revision/latest/scale-to-width-down/323?cb=20160730050722","gender":"male","alive":false,"death":298,"father":"Rickard Stark","house":"House Stark","first_seen":"Winter Is Coming\"","actor":"Sean Bean","createdAt":"2019-04-10T07:16:16.773Z","updatedAt":"2019-04-10T07:16:16.773Z","__v":0,"pagerank":{"title":"Eddard_Stark","rank":1133},"age":{"name":"Eddard Stark","age":60},"related":[{"_id":"5cb7137e8b32d4b573ec92be","name":"Eddard Stark","slug":"Eddard_Stark","mentions":14}],"id":"5cad9840b0c0ef00108e6529"}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getBySlug(slug): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return characters with slug :slug.
     */
    async getBySlug(req, res) {
        let characters = await this.charStore.getBySlug(req.params.slug);
        if(characters.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(characters.data);
        } else {
            res.status(404).send(characters.message);
        }
    }

    /**
     * @api {get} /api/show/characters/byHouse/:house Get characters by house
     * @apiVersion 0.0.2
     * @apiName GetCharactersByHouseShow
     * @apiGroup CharacterShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"titles":["Lord of Winterfell","Lord Paramount of the North","Warden","The North","Hand of the King","Robert Baratheon","Joffrey Baratheon","Regent","Joffrey Baratheon","Protector of the Realm","Joffrey Baratheon"],"origin":["Winterfell","The Eyrie"],"siblings":["Brandon Stark ","Lyanna Stark","Benjen Stark"],"spouse":["Catelyn Tully"],"lovers":[],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"culture":["Northmen"],"religion":["Old Gods of the Forest"],"allegiances":["House Stark","House Baratheon of King's Landing"],"seasons":[],"appearances":["Winter Is Coming","The Kingsroad","Lord Snow","Cripples, Bastards, and Broken Things","The Wolf and the Lion","A Golden Crown","You Win or You Die","The Pointy End","Baelor"],"_id":"5cad9840b0c0ef00108e6529","name":"Eddard Stark","slug":"Eddard_Stark","image":"https://vignette.wikia.nocookie.net/gameofthrones/images/3/37/Eddard_Stark_infobox_new.jpg/revision/latest/scale-to-width-down/323?cb=20160730050722","gender":"male","alive":false,"death":298,"father":"Rickard Stark","house":"House Stark","first_seen":"Winter Is Coming\"","actor":"Sean Bean","createdAt":"2019-04-10T07:16:16.773Z","updatedAt":"2019-04-10T07:16:16.773Z","__v":0,"pagerank":{"title":"Eddard_Stark","rank":1133},"age":{"name":"Eddard Stark","age":60},"related":[{"_id":"5cb7137e8b32d4b573ec92be","name":"Eddard Stark","slug":"Eddard_Stark","mentions":14}],"id":"5cad9840b0c0ef00108e6529"}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByHouse(house): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return characters with house :house.
     */
    async getByHouse(req, res) {
        let characters = await this.charStore.getByHouse(req.params.house);
        if(characters.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(characters.data);
        } else {
            res.status(404).send(characters.message);
        }
    }

    /**
     * @api {post} /api/show/characters/updateGeneral Update character
     * @apiVersion 0.0.2
     * @apiName UpdateGeneralCharacterGeneralShow
     * @apiGroup CharacterShow
     *
     * @apiParam {String} token Security Token for authentication
     * @apiParam {String} slug The character's slug for identification
     * @apiParam {Float} plod Predicted likelihood of death for that character (between 0 - 1)
     * @apiParam {Float[]} longevity Predicted longevity (between 0 - 1)
     * @apiParam {Int} longevityStart Longevity Start
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     data.name has been updated
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Updates general plod, longevity, longevityStart, specifiy these fields in https body (x-www-form-urlencoded)
     */
    async updateGeneral(req, res) {
        let slug = req.params.slug ? req.params.slug : req.body.slug;
        let plod = req.params.plod ? req.params.plod : req.body.plod;
        let longevity = req.params.longevity ? req.params.longevity : req.body.longevity;
        let longevityStart = req.params.longevityStart ? req.params.longevityStart : req.body.longevityStart;
        let character = await this.charStore.updateGeneral(slug, plod, longevity, longevityStart);
        if(character.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(character.message);
        } else {
            res.status(404).send(character.message);
        }
    }

    /**
     * @api {post} /api/show/characters/updateGroupB Update characters Group B
     * @apiVersion 0.0.2
     * @apiName UpdateGroupBCharacterShow
     * @apiGroup CharacterShow
     *
     * @apiParam {String} token Security Token for authentication
     * @apiParam {String} slug The character's slug for identification
     * @apiParam {Float} plod Predicted likelihood of death for that character (between 0 - 1)
     * @apiParam {Float[]} longevity Predicted longevity (between 0 - 1)
     * @apiParam {Int} longevityStart Longevity Start
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     data.name has been updated (Group B)
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Updates plod, longevity, longevityStart, specify slug and plod in https body (x-www-form-urlencoded)
     */
    async updateGroupB(req, res) {
        let slug = req.params.slug ? req.params.slug : req.body.slug;
        let plod = req.params.plod ? req.params.plod : req.body.plod;
        let longevity = req.params.longevity ? req.params.longevity : req.body.longevity;
        let longevityStart = req.params.longevityStart ? req.params.longevityStart : req.body.longevityStart;
        let character = await this.charStore.updateGroupB(slug, plod, longevity, longevityStart);
        if(character.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(character.message);
        } else {
            res.status(404).send(character.message);
        }
    }

    /**
     * @api {post} /api/show/characters/updateGroupC Update characters Group C
     * @apiVersion 0.0.2
     * @apiName UpdateGroupCCharacterShow
     * @apiGroup CharacterShow
     *
     * @apiParam {String} token Security Token for authentication
     * @apiParam {String} slug The character's slug for identification
     * @apiParam {Float} plod Predicted likelihood of death for that character (between 0 - 1)
     * @apiParam {Float[]} longevity Predicted longevity (between 0 - 1)
     * @apiParam {Int} longevityStart Longevity Start
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     data.name has been updated (Group C)
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Updates plod, longevity, longevityStart, specify these fields in https body (x-www-form-urlencoded)
     */
    async updateGroupC(req, res) {
        let slug = req.params.slug ? req.params.slug : req.body.slug;
        let plod = req.params.plod ? req.params.plod : req.body.plod;
        let longevity = req.params.longevity ? req.params.longevity : req.body.longevity;
        let longevityStart = req.params.longevityStart ? req.params.longevityStart : req.body.longevityStart;
        let character = await this.charStore.updateGroupC(slug, plod, longevity, longevityStart);
        if(character.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(character.message);
        } else {
            res.status(404).send(character.message);
        }
    }
}

module.exports = CharacterController;