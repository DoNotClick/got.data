const EpisodeStore = require('../../stores/map/episode');

class EpisodeController {
    constructor() {
        this.episodeStore = new EpisodeStore();
    }

    async getAll(req, res) {
        let result = await this.episodeStore.getAll();
        if (result.success === 1) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }

    async getByName(req, res) {
        let result = await this.episodeStore.getByName(req.params.name);
        if (result.success === 1) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }

    async getById(req, res) {
        let result = await this.episodeStore.getById(req.params.name);
        if (result.success === 1) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }

    async getEpisodesByCharacter(req, res) {
        let result = await this.episodeStore.getEpisodesByCharacter(req.params.name);
        if (result.success === 1) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }
}
module.exports = EpisodeController;