const RegionStore = require('../../stores/fandom/region');

class RegionController {
    constructor() {
        this.regionStore = new RegionStore();
    }

    /**
     * @api {get} /api/show/regions Get all regions
     * @apiVersion 0.0.2
     * @apiName GetAllRegionsShow
     * @apiGroup RegionShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"rulers":[],"religion":[],"culture":[],"cities":[],"towns":[],"castles":[],"founder":[],"placesOfNote":[],"_id":"5cad97e7b0c0ef00108e5df9","name":"The Axe","location":"","geography":"","regionCapital":"","__v":0},..,{..}]
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
     * @api {get} /api/show/regions/:name Get regions by name
     * @apiVersion 0.0.2
     * @apiName GetRegionsByNameShow
     * @apiGroup RegionShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"rulers":[],"religion":[],"culture":[],"cities":[],"towns":[],"castles":[],"founder":[],"placesOfNote":[],"_id":"5cad97e7b0c0ef00108e5df9","name":"The Axe","location":"","geography":"","regionCapital":"","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Result empty
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
     * @api {get} /api/show/regions/byLocation/:location Get regions by location
     * @apiVersion 0.0.2
     * @apiName GetRegionsByLocationShow
     * @apiGroup RegionShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"rulers":[],"religion":[],"culture":[],"cities":[],"towns":[],"castles":[],"founder":[],"placesOfNote":[],"_id":"5cad97e7b0c0ef00108e5df9","name":"The Axe","location":"","geography":"","regionCapital":"","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByLocation(location): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return regions having location :location.
     */
    async getByLocation(req, res) {
        let regions = await this.regionStore.getByLocation(req.params.location);
        if(regions.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(regions.data);
        } else {
            res.status(404).send(regions.message);
        }
    }
}

module.exports = RegionController;