const CharacterStore = require('../../stores/map/characterStore');

class CharacterController {
    constructor() {
        this.characterStore = new CharacterStore();
    }

    async getAll(req, res) {
        let result = await this.characterStore.getAll();
        if (result.success === 1) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }

    async getByName(req, res) {
        let result = await this.characterStore.getByName(req.params.name);
        if (result.success === 1) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }

    async getBySlug(req, res) {
        let result = await this.characterStore.getBySlug(req.params.name);
        if (result.success === 1) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }

    async getById(req, res) {
        let result = await this.characterStore.getById(req.params.name);
        if (result.success === 1) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }
}
module.exports = CharacterController;