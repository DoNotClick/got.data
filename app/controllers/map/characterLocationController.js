const CharacterLocationStore = require('../../stores/westeros/characterLocation');

class CharacterLocationController {
    constructor() {
        this.characterLocationStore = new CharacterLocationStore();
    }

    /**
     * @api {get} /api/map/characterlocations Get all character locations
     * @apiVersion 0.0.2
     * @apiName GetAllCharacterLocationsMap
     * @apiGroup CharacterLocationMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[{"locations":["Ashford","Oldtown"],"_id":"5cad9b1fb0c0ef00108e7290","name":"Abelar Hightower","slug":"Abelar_Hightower","__v":0}, {..},..]}
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
        let result = await this.characterLocationStore.getAll();
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
     * @api {get} /api/map/characterlocations/:name Get character locations by name
     * @apiVersion 0.0.2
     * @apiName GetCharacterLocationsByNameMap
     * @apiGroup CharacterLocationMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[{"locations":["White Harbor","Tumbledown Tower","King's Landing","Nightfort","Castle Black","Queenscrown","Winterfell","Tower","Riverrun","Nightfort","Castle Black","Queenscrown","Tumbledown Tower","Winterfell","White Harbor","Tower","Riverrun","Harrenhal","King's Landing","Lys","Valyria"],"_id":"5cad9b1fb0c0ef00108e7394","name":"Bran Stark","slug":"Bran_Stark","__v":0}]}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"No characters matched your criteria"}
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Character collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return character locations named :name.
     */
    async getByName(req, res) {
        let result = await this.characterLocationStore.getByName(req.params.name);
        if(result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({
                'message': 'Success',
                'data': [result.data]
            });
        } else {
            res.status(404).send({'message': result.message});
        }
    }

    /**
     * @api {get} /api/map/characterlocations/bySlug/:slug Get character locations by slug
     * @apiVersion 0.0.2
     * @apiName GetCharacterLocationsBySlugMap
     * @apiGroup CharacterLocationMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[{"locations":["White Harbor","Tumbledown Tower","King's Landing","Nightfort","Castle Black","Queenscrown","Winterfell","Tower","Riverrun","Nightfort","Castle Black","Queenscrown","Tumbledown Tower","Winterfell","White Harbor","Tower","Riverrun","Harrenhal","King's Landing","Lys","Valyria"],"_id":"5cad9b1fb0c0ef00108e7394","name":"Bran Stark","slug":"Bran_Stark","__v":0}]}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getBySlug(Slug): Character collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return character locations with slug :slug.
     */
    async getBySlug(req, res) {
        let result = await this.characterLocationStore.getBySlug(req.params.slug);
        if(result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({
                'message': 'Success',
                'data': [result.data]
            });
        } else {
            res.status(404).send({'message': result.message});
        }
    }

    /**
     * @api {get} /api/map/characterlocations/byLocation/:location Get character locations by location
     * @apiVersion 0.0.2
     * @apiName GetCharacterLocationsByLocationMap
     * @apiGroup CharacterLocationMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[{"locations":["White Harbor","Tumbledown Tower","King's Landing","Nightfort","Castle Black","Queenscrown","Winterfell","Tower","Riverrun","Nightfort","Castle Black","Queenscrown","Tumbledown Tower","Winterfell","White Harbor","Tower","Riverrun","Harrenhal","King's Landing","Lys","Valyria"],"_id":"5cad9b1fb0c0ef00108e7394","name":"Bran Stark","slug":"Bran_Stark","__v":0}]}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[]}
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByLocation(location): Character collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return character locations with location :location.
     */
    async getByLocation(req, res) {
        let result = await this.characterLocationStore.getByLocation(req.params.location);
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

module.exports = CharacterLocationController;