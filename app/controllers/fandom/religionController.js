const ReligionStore = require('../../stores/fandom/religion');

class ReligionController {
    constructor() {
        this.relStore = new ReligionStore();
    }

    /**
     * @api {get} /api/show/religions Get all religions
     * @apiVersion 0.0.2
     * @apiName GetAllReligionsShow
     * @apiGroup ReligionShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"rulers":[],"religion":[],"culture":[],"cities":[],"towns":[],"castles":[],"founder":[],"placesOfNote":[],"_id":"5cad97e7b0c0ef00108e5df9","name":"The Axe","location":"","geography":"","regionCapital":"","__v":0},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Religion collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all religions currently stored.
     */
    async getAll(req, res) {
        let religions = await this.relStore.getAll();
        if(religions.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(religions.data);
        } else {
            res.status(404).send(religions.message);
        }
    }

    /**
     * @api {get} /api/show/religions/:title Get religions by title
     * @apiVersion 0.0.2
     * @apiName GetReligionsByTitleShow
     * @apiGroup ReligionShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"rulers":[],"religion":[],"culture":[],"cities":[],"towns":[],"castles":[],"founder":[],"placesOfNote":[],"_id":"5cad97e7b0c0ef00108e5df9","name":"The Axe","location":"","geography":"","regionCapital":"","__v":0},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByTitle(title): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return religions named :title.
     */
    async getByTitle(req, res) {
        let religions = await this.relStore.getByName(req.params.title);
        if(religions.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(religions.data);
        } else {
            res.status(404).send(religions.message);
        }
    }
}

module.exports = ReligionController;