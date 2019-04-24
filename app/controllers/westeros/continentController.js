const ContinentStore = require('../../stores/westeros/continent');

class ContinentController {
    constructor() {
        this.continentStore = new ContinentStore();
    }

    /**
     * @api {get} /api/book/continents Get all continents
     * @apiVersion 0.0.2
     * @apiName GetAllContinentsBook
     * @apiGroup ContinentBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"neighbors":["Westeros","Sothoryos"],"_id":"5cad97c6b0c0ef00108e532d","name":"Essos","cardinalDirection":"east","__v":0},{"neighbors":["Essos","Westeros"],"_id":"5cad97c6b0c0ef00108e532e","name":"Sothoryos","cardinalDirection":"south","__v":0},{"neighbors":["Essos","Sothoryos"],"_id":"5cad97c6b0c0ef00108e532f","name":"Westeros","cardinalDirection":"west","__v":0}]
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Continent collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all continents currently stored.
     */
    async getAll(req, res) {
        let continents = await this.continentStore.getAll();
        if(continents.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(continents.data);
        } else {
            res.status(404).send(continents.message);
        }
    }

    /**
     * @api {get} /api/book/continents/:name Get continents by name
     * @apiVersion 0.0.2
     * @apiName GetContinentsByNameBook
     * @apiGroup ContinentBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"neighbors":["Westeros","Sothoryos"],"_id":"5cad97c6b0c0ef00108e532d","name":"Essos","cardinalDirection":"east","__v":0}]
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Continent collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return continents named :name.
     */
    async getByName(req, res) {
        let continents = await this.continentStore.getByName(req.params.name);
        if(continents.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(continents.data);
        } else {
            res.status(404).send(continents.message);
        }
    }
}

module.exports = ContinentController;