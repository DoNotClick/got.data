const PageRankStore = require('../../stores/fandom/pagerank');

class PageRankController {
    constructor() {
        this.rankStore = new PageRankStore();
    }

    /**
     * @api {get} /api/show/ranks Get all ranks
     * @apiVersion 0.0.2
     * @apiName GetAllRanksShow
     * @apiGroup RankShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cad9d47b0c0ef00108e8a8d","title":"HBO","rank":93,"__v":0},{"_id":"5cad9d47b0c0ef00108e8a8e","title":"A_Song_of_Ice_and_Fire","rank":1881,"__v":0},{"_id":"5cad9d47b0c0ef00108e8a8f","title":"George_R.R._Martin","rank":287,"__v":0},..,{..}]
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
     * @api {get} /api/show/ranks/:slug Get ranks by slug
     * @apiVersion 0.0.2
     * @apiName GetRanksBySlugShow
     * @apiGroup RankShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cad9d47b0c0ef00108e8a8d","title":"HBO","rank":93,"__v":0},{"_id":"5cad9d47b0c0ef00108e8a8e","title":"A_Song_of_Ice_and_Fire","rank":1881,"__v":0},{"_id":"5cad9d47b0c0ef00108e8a8f","title":"George_R.R._Martin","rank":287,"__v":0},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getBySlug(slug): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return ranks having slug :slug.
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