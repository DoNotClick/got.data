const TownStore = require('../../stores/fandom/town');

class TownController {
    constructor() {
        this.townStore = new TownStore();
    }

    /**
     * @api {get} /api/show/towns Get all towns
     * @apiVersion 0.0.2
     * @apiName GetAllTownsShow
     * @apiGroup TownShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"rulers":["House Ashford"],"religion":["Faith of the Seven"],"_id":"5cad97e0b0c0ef00108e5d7f","name":"Ashford","location":"The Reach","type":"Castle and town","__v":0},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Town collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all towns currently stored.
     */
    async getAll(req, res) {
        let towns = await this.townStore.getAll();
        if(towns.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(towns.data);
        } else {
            res.status(404).send(towns.message);
        }
    }

    /**
     * @api {get} /api/show/towns/:name Get towns by name
     * @apiVersion 0.0.2
     * @apiName GetTownsByNameShow
     * @apiGroup TownShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"rulers":["House Ashford"],"religion":["Faith of the Seven"],"_id":"5cad97e0b0c0ef00108e5d7f","name":"Ashford","location":"The Reach","type":"Castle and town","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return towns named :name
     */
    async getByName(req, res) {
        let towns = await this.townStore.getByName(req.params.name);
        if(towns.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(towns.data);
        } else {
            res.status(404).send(towns.message);
        }
    }

    /**
     * @api {get} /api/show/towns/byLocation/:location Get towns by name
     * @apiVersion 0.0.2
     * @apiName GetTownsByLocationShow
     * @apiGroup TownShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"rulers":["House Ashford"],"religion":["Faith of the Seven"],"_id":"5cad97e0b0c0ef00108e5d7f","name":"Ashford","location":"The Reach","type":"Castle and town","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByLocation(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return towns with location :location.
     */
    async getByLocation(req, res) {
        let towns = await this.townStore.getByLocation(req.params.location);
        if(towns.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(towns.data);
        } else {
            res.status(404).send(towns.message);
        }
    }

    /**
     * @api {get} /api/show/towns/byRuler/:name Get towns by ruler
     * @apiVersion 0.0.2
     * @apiName GetTownsByRulerShow
     * @apiGroup TownShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"rulers":["House Ashford"],"religion":["Faith of the Seven"],"_id":"5cad97e0b0c0ef00108e5d7f","name":"Ashford","location":"The Reach","type":"Castle and town","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByRuler(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return towns with ruler :name.
     */
    async getByRuler(req, res) {
        let towns = await this.townStore.getByRuler(req.params.name);
        if(towns.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(towns.data);
        } else {
            res.status(404).send(towns.message);
        }
    }

    /**
     * @api {get} /api/show/towns/byReligion/:religion Get towns by religion
     * @apiVersion 0.0.2
     * @apiName GetTownsByReligionShow
     * @apiGroup TownShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"rulers":["House Ashford"],"religion":["Faith of the Seven"],"_id":"5cad97e0b0c0ef00108e5d7f","name":"Ashford","location":"The Reach","type":"Castle and town","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByReligion(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return towns with religion :religion.
     */
    async getByReligion(req, res) {
        let towns = await this.townStore.getByReligion(req.params.name);
        if(towns.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(towns.data);
        } else {
            res.status(404).send(towns.message);
        }
    }
}

module.exports = TownController;