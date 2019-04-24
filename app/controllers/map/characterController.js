const CharacterStore = require('../../stores/map/character');

class CharacterController {
    constructor() {
        this.characterStore = new CharacterStore();
    }

    /**
     * @api {get} /api/map/characters Get all characters
     * @apiVersion 0.0.2
     * @apiName GetAllCharactersMap
     * @apiGroup CharacterMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message": "Success", "data" : [{"titles":["Ser"],"books":["The Hedge Knight"],"_id":"5cad97c6b0c0ef00108e5399","male":true,"house":"House Hightower","slug":"Abelar_Hightower","name":"Abelar Hightower","createdAt":"2019-04-10T07:14:14.490Z","updatedAt":"2019-04-10T07:14:14.490Z","__v":0}, {..}, .. ]}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[]}
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Character collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all characters currently stored.
     */
    async getAll(req, res) {
        let result = await this.characterStore.getAll();
        if(result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({
                'message': 'Success',
                'data': result.data
            });
        } else {
            res.status(404).send({'message': result.message});
        }
    }

    /**
     * @api {get} /api/map/characters/:name Get characters by name
     * @apiVersion 0.0.2
     * @apiName GetCharactersByNameMap
     * @apiGroup CharacterMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     { "message" : "Success" , "data" : {"titles":["Ser"],"books":["The Mystery Knight"],"_id":"5cad97c6b0c0ef00108e539b","male":true,"slug":"Addam","name":"Addam","createdAt":"2019-04-10T07:14:14.491Z","updatedAt":"2019-04-10T07:14:14.491Z","__v":0}}
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return characters named :name.
     */
    async getByName(req, res) {
        let result = await this.characterStore.getByName(req.params.name);
        if(result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({
                'message': 'Success',
                'data': result.data
            });
        } else {
            res.status(404).send({'message': result.message});
        }
    }

    /**
     * @api {get} /api/map/characters/bySlug/:slug Get characters by slug
     * @apiVersion 0.0.2
     * @apiName GetCharactersBySlugMap
     * @apiGroup CharacterMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     { "message" : "Success","data":{"titles":["Ser"],"books":["The Mystery Knight"],"_id":"5cad97c6b0c0ef00108e539b","male":true,"slug":"Addam","name":"Addam","createdAt":"2019-04-10T07:14:14.491Z","updatedAt":"2019-04-10T07:14:14.491Z","__v":0}}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     { "message" : "No characters matched your criteria" }
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getBySlug(slug): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return characters with slug :slug.
     */
    async getBySlug(req, res) {
        let result = await this.characterStore.getBySlug(req.params.slug);
        if(result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({
                'message': 'Success',
                'data': result.data
            });
        } else {
            res.status(404).send({'message': result.message});
        }
    }

    /**
     * @api {get} /api/map/characters/byId/:id Get characters by id
     * @apiVersion 0.0.2
     * @apiName GetCharactersByIdMap
     * @apiGroup CharacterMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     { "message" : "Success","data":{"titles":["Ser"],"books":["The Mystery Knight"],"_id":"5cad97c6b0c0ef00108e539b","male":true,"slug":"Addam","name":"Addam","createdAt":"2019-04-10T07:14:14.491Z","updatedAt":"2019-04-10T07:14:14.491Z","__v":0}}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     { "message" : "No characters matched your criteria" }
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getById(id): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return characters with id :id.
     */
    async getById(req, res) {
        let result = await this.characterStore.getById(req.params.id);
        if(result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({
                'message': 'Success',
                'data': result.data
            });
        } else {
            res.status(404).send({'message': result.message});
        }
    }
}

module.exports = CharacterController;