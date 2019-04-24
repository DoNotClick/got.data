const AgeStore = require('../../stores/fandom/age');

class AgeController {
    constructor() {
        this.ageStore = new AgeStore();
    }

    /**
     * @api {get} /api/show/ages/ Get all ages
     * @apiVersion 0.0.2
     * @apiName GetAllAgesShow
     * @apiGroup AgeShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cad9834b0c0ef00108e6385","name":"Eddard Stark","age":60,"__v":0},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Age collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all the ages currently stored.
     */
    async getAll(req, res) {
        let ages = await this.ageStore.getAll();
        if(ages.success === STORE_RESPONSE_SUCCESS) {
            return res.status(200).send(ages.data);
        } else {
            return res.status(404).send(ages.message);
        }
    }

    /**
     * @api {get} /api/show/ages/:name Get ages by name
     * @apiVersion 0.0.2
     * @apiName GetAgeByNameShow
     * @apiGroup AgeShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cad9834b0c0ef00108e6385","name":"Eddard Stark","age":60,"__v":0}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     *
     * @apiDescription Return the age for characters named :name.
     */
    async getByName(req, res) {
        let name = req.params.name ? req.params.name : req.body.name;
        let ages = await this.ageStore.getByName(name);
        if(ages.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(ages.data);
        } else {
            res.status(404).send(ages.message);
        }
    }

    /**
     * @api {get} /api/ages/byAge/:age Get characters by age
     * @apiVersion 0.0.2
     * @apiName GetAgeByAgeShow
     * @apiGroup AgeShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cad9834b0c0ef00108e6385","name":"Eddard Stark","age":60,"__v":0}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByAge(age): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     *
     *
     * @apiDescription Return the list of characters with a specific age :age.
     */
    async getByAge(req, res) {
        let ages = await this.ageStore.getByAge(req.params.age);
        if(ages.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(ages.data);
        } else {
            res.status(404).send(ages.message);
        }
    }
}

module.exports = AgeController;