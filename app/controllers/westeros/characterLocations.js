const CharacterLocationStore = require('../../stores/westeros/characterLocation');

class CharacterLocationController {
    constructor() {
        this.characterLocationStore = new CharacterLocationStore();
    }

    /**
     * @api {get} /api/book/characterlocations Get all character locations
     * @apiVersion 0.0.2
     * @apiName GetAllCharacterLocationsBook
     * @apiGroup CharacterLocationBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[{"locations":["Ashford","Oldtown"],"_id":"5cad9b1fb0c0ef00108e7290","name":"Abelar Hightower","slug":"Abelar_Hightower","__v":0}, {..}, ..]}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[] }
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Character collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all character locations currently stored.
     */
    async getAll(req, res) {
        let characterLocations = await this.characterLocationStore.getAll();
        if(characterLocations.success === STORE_RESPONSE_SUCCESS) {
            return res.status(200).send({
                message: 'Success',
                data: characterLocations.data
            });
        } else {
            return res.status(404).send(characterLocations.message);
        }
    }

    /**
     * @api {get} /api/book/characterlocations/:name Get all character locations by name
     * @apiVersion 0.0.2
     * @apiName GetCharacterLocationsByNameBook
     * @apiGroup CharacterLocationBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"locations":["Duskendale","Ashemark","Duskendale"],"_id":"5cad9b1fb0c0ef00108e7291","name":"Addam","slug":"Addam","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     No characters matched your criteria
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Character collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return character locations named :name.
     */
    async getByName(req, res) {
        let name = req.params.name ? req.params.name : req.body.name;
        let characterLocations = await this.characterLocationStore.getByName(name);
        if(characterLocations.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(characterLocations.data);
        } else {
            res.status(404).send(characterLocations.message);
        }
    }

    /**
     * @api {get} /api/book/characterlocations/:slug Get all character locations by slug
     * @apiVersion 0.0.2
     * @apiName GetCharacterLocationsBySlugBook
     * @apiGroup CharacterLocationBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"locations":["Duskendale","Ashemark","Duskendale"],"_id":"5cad9b1fb0c0ef00108e7291","name":"Addam","slug":"Addam","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     No characters matched your criteria
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getBySlug(slug): Character collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return character locations with slug :slug.
     */
    async getBySlug(req, res) {
        let slug = req.params.slug ? req.params.slug : req.body.slug;
        let characterLocations = await this.characterLocationStore.getBySlug(slug);
        if(characterLocations.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(characterLocations.data);
        } else {
            res.status(404).send(characterLocations.message);
        }
    }
}

module.exports = CharacterLocationController;