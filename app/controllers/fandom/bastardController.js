const BastardStore = require('../../stores/fandom/bastard');

class BastardController {
    constructor() {
        this.bastardStore = new BastardStore();
    }

    /**
     * @api {get} /api/show/bastards Get all bastards
     * @apiVersion 0.0.2
     * @apiName GetAllBastardsShow
     * @apiGroup BastardShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cad97c9b0c0ef00108e5ce8","name":"Bastardy","__v":0},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Bastard collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all bastards currently stored.
     */
    async getAll(req, res) {
        let bastards = await this.bastardStore.getAll();
        if(bastards.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(bastards.data);
        } else {
            res.status(404).send(bastards.message);
        }
    }

    /**
     * @api {get} /api/show/bastards/:name Get bastards by name
     * @apiVersion 0.0.2
     * @apiName GetBastardsByNameShow
     * @apiGroup BastardShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cad97c9b0c0ef00108e5ce8","name":"Bastardy","__v":0},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all bastards named :name.
     */
    async getByName(req, res) {
        let bastards = await this.bastardStore.getByName(req.params.name);
        if(bastards.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(bastards.data);
        } else {
            res.status(404).send(bastards.message);
        }
    }
}

module.exports = BastardController;