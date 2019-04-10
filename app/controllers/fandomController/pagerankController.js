const PageRankStore = require('../../stores/fandom/pagerank');

class PageRankController {
    constructor() {
        this.rankStore = new PageRankStore();
    }

    async getAll(req, res) {
        let ranks = await this.rankStore.getAll();
        if (ranks.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(ranks.data);
        } else {
            res.status(404).send(ranks.message);
        }
    }
    
    async getBySlug(req, res) {
        let ranks = await this.rankStore.getBySlug(req.params.slug);
        if (ranks.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(ranks.data);
        } else {
            res.status(404).send(ranks.message);
        }
    }
}

module.exports = PageRankController;