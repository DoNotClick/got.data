const CultureStore = require('../../stores/westeros/culture');

class CultureController {
    constructor() {
        this.cultureStore = new CultureStore();
    }

    /**
     * @api {get} /api/book/cultures Get all cultures
     * @apiVersion 0.0.2
     * @apiName GetAllCulturesBook
     * @apiGroup CultureBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cad97c6b0c0ef00108e5781","name":"Northmen","__v":0},{"_id":"5cad97c6b0c0ef00108e5782","name":"Ironborn","__v":0}, {..},..]}
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Culture collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all cultures currently stored.
     */
    async getAll(req, res) {
        let cultures = await this.cultureStore.getAll();
        if(cultures.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cultures.data);
        } else {
            res.status(404).send(cultures.message);
        }
    }

    /**
     * @api {get} /api/book/cultures/:name Get cultures by name
     * @apiVersion 0.0.2
     * @apiName GetCulturesByNameBook
     * @apiGroup CultureBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cad97c6b0c0ef00108e5781","name":"Northmen","__v":0},{"_id":"5cad97c6b0c0ef00108e5782","name":"Ironborn","__v":0}}
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Culture collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return cultures named :name.
     */
    async getByName(req, res) {
        let cultures = await this.cultureStore.getByName(req.params.name);
        if(cultures.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cultures.data);
        } else {
            res.status(404).send(cultures.message);
        }
    }
}

module.exports = CultureController;