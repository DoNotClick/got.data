const CharacterStore = require('../../stores/westeros/character');

class CharacterController {
    constructor() {
        this.charStore = new CharacterStore();
    }

    /**
     * @api {get} /api/book/characters Get all characters
     * @apiVersion 0.0.2
     * @apiName GetAllCharactersBook
     * @apiGroup CharacterBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"titles":["Ser"],"spouse":[],"children":[],"allegiance":["House Hightower"],"books":["The Hedge Knight"],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"_id":"5cad9b57b0c0ef00108e828e","name":"Abelar Hightower","slug":"Abelar_Hightower","gender":"male","culture":"Reach","house":"House Hightower","alive":true,"createdAt":"2019-04-10T07:29:27.696Z","updatedAt":"2019-04-10T07:29:27.696Z","__v":0,"pagerank":{"_id":"5cada629b0c0ef00108eb531","title":"Abelar_Hightower","rank":7},"id":"5cad9b57b0c0ef00108e828e"}, {..},..]
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
     * @api {get} /api/book/characters/:name Get characters by name
     * @apiVersion 0.0.2
     * @apiName GetCharactersByNameBook
     * @apiGroup CharacterBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"titles":["Ser"],"spouse":[],"children":[],"allegiance":["House Hightower"],"books":["The Hedge Knight"],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"_id":"5cad9b57b0c0ef00108e828e","name":"Abelar Hightower","slug":"Abelar_Hightower","gender":"male","culture":"Reach","house":"House Hightower","alive":true,"createdAt":"2019-04-10T07:29:27.696Z","updatedAt":"2019-04-10T07:29:27.696Z","__v":0,"pagerank":{"_id":"5cada629b0c0ef00108eb531","title":"Abelar_Hightower","rank":7},"id":"5cad9b57b0c0ef00108e828e"}, {..},..]
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
     * @api {get} /api/book/characters/bySlug/:slug Get characters by slug
     * @apiVersion 0.0.2
     * @apiName GetCharactersBySlugBook
     * @apiGroup CharacterBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"titles":["Ser"],"spouse":[],"children":[],"allegiance":["House Hightower"],"books":["The Hedge Knight"],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"_id":"5cad9b57b0c0ef00108e828e","name":"Abelar Hightower","slug":"Abelar_Hightower","gender":"male","culture":"Reach","house":"House Hightower","alive":true,"createdAt":"2019-04-10T07:29:27.696Z","updatedAt":"2019-04-10T07:29:27.696Z","__v":0,"pagerank":{"_id":"5cada629b0c0ef00108eb531","title":"Abelar_Hightower","rank":7},"id":"5cad9b57b0c0ef00108e828e"}, {..},..]
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
     * @api {get} /api/book/characters/byHouse/:house Get characters by house
     * @apiVersion 0.0.2
     * @apiName GetCharactersByHouseBook
     * @apiGroup CharacterBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"titles":["Ser"],"spouse":[],"children":[],"allegiance":["House Hightower"],"books":["The Hedge Knight"],"plod":0,"longevity":[],"plodB":0,"plodC":0,"longevityB":[],"longevityC":[],"_id":"5cad9b57b0c0ef00108e828e","name":"Abelar Hightower","slug":"Abelar_Hightower","gender":"male","culture":"Reach","house":"House Hightower","alive":true,"createdAt":"2019-04-10T07:29:27.696Z","updatedAt":"2019-04-10T07:29:27.696Z","__v":0,"pagerank":{"_id":"5cada629b0c0ef00108eb531","title":"Abelar_Hightower","rank":7},"id":"5cad9b57b0c0ef00108e828e"}, {..},..]
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
     * @api {post} /api/book/characters/updateGeneral Update character
     * @apiVersion 0.0.2
     * @apiName UpdateGeneralCharacterGeneralBook
     * @apiGroup CharacterBook
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
     * @api {post} /api/book/characters/updateGroupB Update characters Group B
     * @apiVersion 0.0.2
     * @apiName UpdateGroupBCharacterBook
     * @apiGroup CharacterBook
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
     * @api {post} /api/book/characters/updateGroupC Update characters Group C
     * @apiVersion 0.0.2
     * @apiName UpdateGroupCCharacterBook
     * @apiGroup CharacterBook
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