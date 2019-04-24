const CityStore = require('../../stores/fandom/city');

class CityController {
    constructor() {
        this.citieStore = new CityStore();
    }

    /**
     * @api {get} /api/show/cities Get all cities
     * @apiVersion 0.0.2
     * @apiName GetAllCityShow
     * @apiGroup CityShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"rulers":[],"religion":[],"founder":[],"placesOfNote":[],"_id":"5cad97e9b0c0ef00108e5e46","name":"Ar Noy","location":"The Qhoyne","type":"City","__v":0},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): City collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all cities currently stored.
     */
    async getAll(req, res) {
        let cities = await this.citieStore.getAll();
        if(cities.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cities.data);
        } else {
            res.status(404).send(cities.message);
        }
    }

    /**
     * @api {get} /api/show/cities/:name Get cities by name
     * @apiVersion 0.0.2
     * @apiName GetCitiesByNameShow
     * @apiGroup CityShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"rulers":[],"religion":[],"founder":[],"placesOfNote":[],"_id":"5cad97e9b0c0ef00108e5e46","name":"Ar Noy","location":"The Qhoyne","type":"City","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return cities named :name.
     */
    async getByName(req, res) {
        let cities = await this.citieStore.getByName(req.params.name);
        if(cities.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cities.data);
        } else {
            res.status(404).send(cities.message);
        }
    }

    /**
     * @api {get} /api/show/cities/byLocation/:location Get cities by location
     * @apiVersion 0.0.2
     * @apiName GetCitiesByLocationShow
     * @apiGroup CityShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"rulers":[],"religion":[],"founder":[],"placesOfNote":[],"_id":"5cad97e9b0c0ef00108e5e46","name":"Ar Noy","location":"The Qhoyne","type":"City","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByLocation(location): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return cities named :location.
     */
    async getByLocation(req, res) {
        let cities = await this.citieStore.getByLocation(req.params.location);
        if(cities.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cities.data);
        } else {
            res.status(404).send(cities.message);
        }
    }
}

module.exports = CityController;