const CharacterLocationStore = require('../../stores/westeros/characterLocation');

class CharacterLocationController {
    constructor() {
        this.characterLocationStore = new CharacterLocationStore();
    }

    async getAll(req, res) {
        let result = await this.characterLocationStore.getAll();
        if (result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }

    async getByName(req, res) {
        let result = await this.characterLocationStore.getByName(req.params.name);
        if (result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({"message": "Success", "data": [result.data]});
        } else {
            res.status(404).send({"message": result.message});
        }
    }

    async getBySlug(req, res) {
        let result = await this.characterLocationStore.getBySlug(req.params.name);
        if (result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({"message": "Success", "data": [result.data]});
        } else {
            res.status(404).send({"message": result.message});
        }
    }

    async getByLocation(req, res) {
        let result = await this.characterLocationStore.getByLocation(req.params.name);
        if (result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }
}

module.exports = CharacterLocationController;