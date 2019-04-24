const HouseStore = require('../../stores/fandom/house');

class HouseController {
    constructor() {
        this.houseStore = new HouseStore();
    }

    /**
     * @api {get} /api/show/houses Get all houses
     * @apiVersion 0.0.2
     * @apiName GetAllHousesShow
     * @apiGroup HouseShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"seat":[],"allegiance":[],"region":[],"religion":[],"_id":"5cad9830b0c0ef00108e6201","name":"Great House","sigil":"","words":"","createdAt":"2019-04-10T07:16:00.004Z","updatedAt":"2019-04-10T07:16:00.004Z","__v":0},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): House collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all houses currently stored.
     */
    async getAll(req, res) {
        let houses = await this.houseStore.getAll();
        if(houses.success === STORE_RESPONSE_SUCCESS) {
            return res.status(200).send(houses.data);
        } else {
            return res.status(404).send(houses.message);
        }
    }

    /**
     * @api {get} /api/show/houses/:name Get houses by name
     * @apiVersion 0.0.2
     * @apiName GetHousesByNameShow
     * @apiGroup HouseShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"seat":[],"allegiance":[],"region":[],"religion":[],"_id":"5cad9830b0c0ef00108e6201","name":"Great House","sigil":"","words":"","createdAt":"2019-04-10T07:16:00.004Z","updatedAt":"2019-04-10T07:16:00.004Z","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return houses named :name.
     */
    async getByName(req, res) {
        let name = req.params.name ? req.params.name : req.body.name;
        let houses = await this.houseStore.getByName(name);
        if(houses.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(houses.data);
        } else {
            res.status(404).send(houses.message);
        }
    }
}

module.exports = HouseController;