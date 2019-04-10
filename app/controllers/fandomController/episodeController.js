const EpisodeStore = require('../../stores/fandom/episode');

class EpisodeController {
    constructor() {
        this.epStore = new EpisodeStore();
    }

    async getAll(req, res) {
        let episodes = await this.epStore.getAll();
        if (episodes.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(episodes.data);
        } else {
            res.status(404).send(episodes.message);
        }
    }
    
    async getByTitle(req, res) {
        let episodes = await this.epStore.getByTitle(req.params.title);
        if (episodes.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(episodes.data);
        } else {
            res.status(404).send(episodes.message);
        }
    }
}

module.exports = EpisodeController;