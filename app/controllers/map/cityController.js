const CityStore = require('../../stores/westeros/city');

class CityController {
    constructor() {
        this.cityStore = new CityStore();
    }

    /**
     * @api {get} /api/map/cities Get all cities
     * @apiVersion 0.0.2
     * @apiName GetAllCitiesMap
     * @apiGroup CitiesMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[{"regions":[],"_id":"56ddc65131d3a8bb2a56a5be","link":"http://awoiaf.westeros.org/index.php/Westwatch-by-the-Bridge","priority":6,"type":"other","coordY":"83.45580337346581","coordX":"-103.97162858160415","name":"Westwatch by the Bridge","__v":0}, {..},..]}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[]}
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
            res.status(200).send({
                'message': 'Success',
                'data': cities.data
            });
        } else {
            res.status(404).send({'message': cities.message});
        }
    }

    /**
     * @api {get} /api/map/cities/byName/:name Get cities by name
     * @apiVersion 0.0.2
     * @apiName GetCitiesByNameMap
     * @apiGroup CitiesMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":{"regions":[],"_id":"56ddc65131d3a8bb2a56a5be","link":"http://awoiaf.westeros.org/index.php/Westwatch-by-the-Bridge","priority":6,"type":"other","coordY":"83.45580337346581","coordX":"-103.97162858160415","name":"Westwatch by the Bridge","__v":0}}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[]}
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(): City collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return cities named :name.
     */
    async getByName(req, res) {
        let cities = await this.cityStore.getByName(req.params.name);
        if(cities.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({
                'message': 'Success',
                'data': cities.data
            });
        } else {
            res.status(404).send({'message': cities.message});
        }
    }

    /**
     * @api {get} /api/map/cities/byId/:id Get cities by id
     * @apiVersion 0.0.2
     * @apiName GetCitiesByIdMap
     * @apiGroup CitiesMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":{"regions":[],"_id":"56ddc65131d3a8bb2a56a5be","link":"http://awoiaf.westeros.org/index.php/Westwatch-by-the-Bridge","priority":6,"type":"other","coordY":"83.45580337346581","coordX":"-103.97162858160415","name":"Westwatch by the Bridge","__v":0}}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[]}
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getById(): City collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return cities with id :id.
     */
    async getById(req, res) {
        let cities = await this.cityStore.getById(req.params.id);
        if(cities.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({
                'message': 'Success',
                'data': cities.data
            });
        } else {
            res.status(404).send({'message': cities.message});
        }
    }
}

module.exports = CityController;