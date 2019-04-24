const AssassinStore = require('../../stores/fandom/assassin');

class AssassinController {
    constructor() {
        this.assassinStore = new AssassinStore();
    }

    /**
     * @api {get} /api/show/assassins Get all assassins
     * @apiVersion 0.0.2
     * @apiName GetAllAsassinsShow
     * @apiGroup AssassinShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cad97c6b0c0ef00108e5799","slug":"Catspaw_assassin","__v":0,"assassin":null,"id":"5cad97c6b0c0ef00108e5799"},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Assassin collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all the assassins currently stored.
     */
    async getAll(req, res) {
        let assassins = await this.assassinStore.getAll();
        if(assassins.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(assassins.data);
        } else {
            res.status(404).send(assassins.message);
        }
    }

    /**
     * @api {get} /api/show/assassins/:name Get assassins by name
     * @apiVersion 0.0.2
     * @apiName GetAllAsassinsByNameShow
     * @apiGroup AssassinShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"_id":"5cad97c6b0c0ef00108e5799","slug":"Catspaw_assassin","__v":0,"assassin":null,"id":"5cad97c6b0c0ef00108e5799"}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return the assassins named :name.
     */
    async getByName(req, res) {
        let assassins = await this.AssassinStore.getByName(req.params.name);
        if(assassins.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(assassins.data);
        } else {
            res.status(404).send(assassins.message);
        }
    }
}

module.exports = AssassinController;