const CityStore = require('../../stores/westeros/city');

class CityController {
    constructor() {
        this.cityStore = new CityStore();
    }

    /**
     * @api {get} /api/book/cities Get all cities
     * @apiVersion 0.0.2
     * @apiName GetAllCitiesBook
     * @apiGroup CityBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"regions":[],"_id":"56ddc65131d3a8bb2a56a5be","link":"http://awoiaf.westeros.org/index.php/Westwatch-by-the-Bridge","priority":6,"type":"other","coordY":"83.45580337346581","coordX":"-103.97162858160415","name":"Westwatch by the Bridge","__v":0}, {..}, ..]
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
        let cities = await this.cityStore.getAll();
        if(cities.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cities.data);
        } else {
            res.status(404).send(cities.message);
        }
    }

    /**
     * @api {get} /api/book/cities/:name Get cities by name
     * @apiVersion 0.0.2
     * @apiName GetCitiesByNameBook
     * @apiGroup CityBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"regions":[],"_id":"56ddc65231d3a8bb2a56a5cf","link":"http://awoiaf.westeros.org/index.php/Rook%27s_Rest","priority":5,"type":"castle","name":"Rook's Rest","__v":0}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): City collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return cities named :name.
     */
    async getByName(req, res) {
        let cities = await this.cityStore.getByName(req.params.name);
        if(cities.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cities.data);
        } else {
            res.status(404).send(cities.message);
        }
    }

    /**
     * @api {get} /api/book/cities/byContinent/:continent Get cities by continent
     * @apiVersion 0.0.2
     * @apiName GetCitiesByContinentBook
     * @apiGroup CityBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"regions":[],"_id":"56ddc65231d3a8bb2a56a5cf","link":"http://awoiaf.westeros.org/index.php/Rook%27s_Rest","priority":5,"type":"castle","name":"Rook's Rest","__v":0}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByContinent(continent): City collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return cities on the continent :continent.
     */
    async getByContinent(req, res) {
        let cities = await this.cityStore.getByContinent(req.params.continent);
        if(cities.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cities.data);
        } else {
            res.status(404).send(cities.message);
        }
    }
}

module.exports = CityController;