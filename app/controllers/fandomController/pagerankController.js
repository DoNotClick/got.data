
const PageRankStore = require('../../stores/fandom/pagerankStore');
class PageRankController {
    constructor() {
        this.rankStore = new PageRankStore();
    }

    async getAll(req, res) {
        let ranks = await this.rankStore.getAll();
        if (ranks.success === 1) {
            res.status(200).send(ranks.data);
        } else {
            res.status(404).send(ranks.message);
        }
    }
    
    async getByTitle(req, res) {
        let ranks = await this.rankStore.getByTitle(req.params.title);
        if (ranks.success === 1) {
            res.status(200).send(ranks.data);
        } else {
            res.status(404).send(ranks.message);
        }
    }
}
module.exports = PageRankController;