const RegionStore = require('../../stores/westeros/region');

class RegionController {
    constructor() {
        this.regionStore = new RegionStore();
    }

    /**
     * @api {get} /api/book/regions Get all regions
     * @apiVersion 0.0.2
     * @apiName GetAllRegionsBook
     * @apiGroup RegionBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"neighbors":[],"cultures":[],"events":[],"borders":[],"highlights":[],"_id":"5cad97dbb0c0ef00108e5d50","name":"Beyond the Wall","__v":0},{..},..]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Region collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all regions currently stored.
     */
    async getAll(req, res) {
        let regions = await this.regionStore.getAll();
        if(regions.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(regions.data);
        } else {
            res.status(404).send(regions.message);
        }
    }

    /**
     * @api {get} /api/book/regions/:name Get regions by name
     * @apiVersion 0.0.2
     * @apiName GetRegionsByNameBook
     * @apiGroup RegionBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"neighbors":[],"cultures":[],"events":[],"borders":[],"highlights":[],"_id":"5cad97dbb0c0ef00108e5d50","name":"Beyond the Wall","__v":0}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Region collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return regions named :name.
     */
    async getByName(req, res) {
        let regions = await this.regionStore.getByName(req.params.name);
        if(regions.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(regions.data);
        } else {
            res.status(404).send(regions.message);
        }
    }

    /**
     * @api {get} /api/book/regions/byContinent/:continent Get regions by continent
     * @apiVersion 0.0.2
     * @apiName GetRegionsByContinentBook
     * @apiGroup RegionBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"neighbors":[],"cultures":[],"events":[],"borders":[],"highlights":[],"_id":"5cad97dbb0c0ef00108e5d50","name":"Beyond the Wall","__v":0}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByContinent(continent): Region collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return regions on the continent :continent.
     */
    async getByContinent(req, res) {
        let regions = await this.regionStore.getByContinent(req.params.continent);
        if(regions.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(regions.data);
        } else {
            res.status(404).send(regions.message);
        }
    }
}

module.exports = RegionController;