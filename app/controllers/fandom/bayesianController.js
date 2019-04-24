const BayesianAttributeStore = require('../../stores/bayesianAttributes');

class BayesianAttributeController {
    constructor() {
        this.baStore = new BayesianAttributeStore();
    }

    /**
     * @api {get} /api/show/bayesian-attributes Get all bayesian attributes
     * @apiVersion 0.0.2
     * @apiName GetAllBayesianAttributesShow
     * @apiGroup BayesianShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{“House”: 0.3, “Age”: 0.8}, {..},..]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Bayesian collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all bayesian attributes currently stored.
     */
    async getAll(req, res) {
        let characters = await this.baStore.getByWiki('fandom');

        if(characters.success === STORE_RESPONSE_SUCCESS) {
            return res.status(200).send(characters.data);
        } else {
            return res.status(404).send(characters.message);
        }
    }

    /**
     * @api {post} /api/show/bayesian-attributes/update Update Bayesian attributes
     * @apiVersion 0.0.2
     * @apiName UpdateBayesianAttributesShow
     * @apiGroup BayesianShow
     *
     * @apiParam {String} token Security Token for authentication
     * @apiParam {Object} attributes An object which stores all the attributes
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     wiki has been updated
     * @apiErrorExample {json} ErrorInDatabase
     *     HTTP/1.1 404
     *     error in database query! - err
     * @apiDescription Update bayesian attributes.
     */
    async update(req, res) {
        let attributes = req.params.attributes ? req.params.attributes : req.body.attributes;

        let bayesianAttributes = await this.baStore.updateWiki('fandom', attributes);

        if(bayesianAttributes.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(bayesianAttributes.message);
        } else {
            res.status(404).send(bayesianAttributes.message);
        }
    }
}

module.exports = BayesianAttributeController;