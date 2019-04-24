const PageRankStore = require('../../stores/westeros/pagerank');

class PageRankController {
    constructor() {
        this.rankStore = new PageRankStore();
    }

    /**
     * @api {get} /api/book/ranks Get all ranks
     * @apiVersion 0.0.2
     * @apiName GetAllRanksBook
     * @apiGroup RankBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cada628b0c0ef00108e9d90","title":"Faith_Militant_uprising","rank":152,"__v":0},{"_id":"5cada628b0c0ef00108e9d91","title":"House_Targaryen","rank":1469,"__v":0}, {..}, ..]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): PageRank collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all ranks currently stored.
     */
    async getAll(req, res) {
        let ranks = await this.rankStore.getAll();
        if(ranks.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(ranks.data);
        } else {
            res.status(404).send(ranks.message);
        }
    }

    /**
     * @api {get} /api/book/ranks Get ranks by slug
     * @apiVersion 0.0.2
     * @apiName GetRanksBySlugBook
     * @apiGroup RankBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cada628b0c0ef00108e9d90","title":"Faith_Militant_uprising","rank":152,"__v":0},{"_id":"5cada628b0c0ef00108e9d91","title":"House_Targaryen","rank":1469,"__v":0}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getBySlug(slug): PageRank collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return ranks with slug :slug.
     */
    async getBySlug(req, res) {
        let ranks = await this.rankStore.getBySlug(req.params.slug);
        if(ranks.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(ranks.data);
        } else {
            res.status(404).send(ranks.message);
        }
    }
}

module.exports = PageRankController;