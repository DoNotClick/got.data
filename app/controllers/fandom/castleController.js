const CastleStore = require('../../stores/fandom/castle');

class CastleController {
    constructor() {
        this.castleStore = new CastleStore();
    }

    /**
     * @api {get} /api/show/castles Get all castles
     * @apiVersion 0.0.2
     * @apiName GetAllCastleShow
     * @apiGroup CastleShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"religion":["Faith of the Seven"],"rulers":["House Smallwood"],"founder":[],"_id":"5cad9816b0c0ef00108e60d6","name":"Acorn Hall","location":"Westeros","type":"Castle","__v":0},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Castle collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all castles currently stored.
     */
    async getAll(req, res) {
        let castles = await this.castleStore.getAll();
        if(castles.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(castles.data);
        } else {
            res.status(404).send(castles.message);
        }
    }

    /**
     * @api {get} /api/show/castles Get castles by name
     * @apiVersion 0.0.2
     * @apiName GetCastlesByNameShow
     * @apiGroup CastleShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"religion":["Faith of the Seven"],"rulers":["House Smallwood"],"founder":[],"_id":"5cad9816b0c0ef00108e60d6","name":"Acorn Hall","location":"Westeros","type":"Castle","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return castles with name :name.
     */
    async getByName(req, res) {
        let castles = await this.castleStore.getByName(req.params.name);
        if(castles.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(castles.data);
        } else {
            res.status(404).send(castles.message);
        }
    }

    /**
     * @api {get} /api/show/castles/byLocation/:location Get castles by location
     * @apiVersion 0.0.2
     * @apiName GetCastlesByLocationShow
     * @apiGroup CastleShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"religion":["Faith of the Seven"],"rulers":["House Smallwood"],"founder":[],"_id":"5cad9816b0c0ef00108e60d6","name":"Acorn Hall","location":"Westeros","type":"Castle","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByLocation(location): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return castles with location :location.
     */
    async getByLocation(req, res) {
        let castles = await this.castleStore.getByLocation(req.params.location);
        if(castles.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(castles.data);
        } else {
            res.status(404).send(castles.message);
        }
    }
}

module.exports = CastleController;