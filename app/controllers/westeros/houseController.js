const HouseStore = require('../../stores/westeros/house');

class HouseController {
    constructor() {
        this.houseStore = new HouseStore();
    }

    /**
     * @api {get} /api/book/houses Get all houses
     * @apiVersion 0.0.2
     * @apiName GetAllHousesBook
     * @apiGroup HouseBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"titles":["Seagard"],"overlords":["House Tully","House Baelish"],"ancestralWeapon":[],"_id":"5cad9907b0c0ef00108e6846","name":"House Mallister","image":"https://awoiaf.westeros.org/thumb.php?f=House_Mallister.svg&width=250","coatOfArms":"A silver eagle, displayed, on an indigo field(Purpure, an eagle displayed argent)","words":"Above the Rest","currentLord":"Jason Mallister","seat":"Seagard","region":"Riverlands","founded":null,"founder":null,"cadetBranch":null,"heir":"Patrek Mallister","isExtinct":false,"createdAt":"2019-04-10T07:19:35.969Z","updatedAt":"2019-04-10T07:19:35.969Z","__v":0},{..},..]
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
     * @api {get} /api/book/houses/:name Get houses by name
     * @apiVersion 0.0.2
     * @apiName GetAllHousesBook
     * @apiGroup HouseBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"titles":["Seagard"],"overlords":["House Tully","House Baelish"],"ancestralWeapon":[],"_id":"5cad9907b0c0ef00108e6846","name":"House Mallister","image":"https://awoiaf.westeros.org/thumb.php?f=House_Mallister.svg&width=250","coatOfArms":"A silver eagle, displayed, on an indigo field(Purpure, an eagle displayed argent)","words":"Above the Rest","currentLord":"Jason Mallister","seat":"Seagard","region":"Riverlands","founded":null,"founder":null,"cadetBranch":null,"heir":"Patrek Mallister","isExtinct":false,"createdAt":"2019-04-10T07:19:35.969Z","updatedAt":"2019-04-10T07:19:35.969Z","__v":0}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): House collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all houses named :name.
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