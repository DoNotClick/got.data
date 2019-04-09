const EpisodeStore = require('../../stores/fandom/episodeStore');
class EpisodeController {
    constructor() {
        this.epStore = new EpisodeStore();
    }

    async getAll(req, res) {
        let episodes = await this.epStore.getAll();
        if (episodes.success === 1) {
            res.status(200).send(episodes.data);
        } else {
            res.status(404).send(episodes.message);
        }
    }
    
    async getByTitle(req, res) {
        let episodes = await this.epStore.getByTitle(req.params.title);
        if (episodes.success === 1) {
            res.status(200).send(episodes.data);
        } else {
            res.status(404).send(episodes.message);
        }
    }
}
module.exports = EpisodeController;