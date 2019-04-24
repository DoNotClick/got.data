const AgeStore = require('../../stores/westeros/age');

class AgeController {
    constructor() {
        this.ageStore = new AgeStore();
    }

    /**
     * @api {get} /api/book/ages/ Get all ages
     * @apiVersion 0.0.2
     * @apiName GetAllAgesBook
     * @apiGroup AgeBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cad97c7b0c0ef00108e57e9","name":"Dawn Age","successor":"Age of Heroes","endDate":1000032,"__v":0}, {..}, ..]
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
            res.status(200).send(ages.data);
        } else {
            res.status(404).send(ages.message);
        }
    }

    /**
     * @api {get} /api/book/ages/:name Get ages by name
     * @apiVersion 0.0.2
     * @apiName GetAgeByNameBook
     * @apiGroup AgeBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cad97c7b0c0ef00108e57e9","name":"Dawn Age","successor":"Age of Heroes","endDate":1000032,"__v":0}]
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
        let ages = await this.ageStore.getByName(req.params.name);
        if(ages.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(ages.data);
        } else {
            res.status(404).send(ages.message);
        }
    }
}

module.exports = AgeController;