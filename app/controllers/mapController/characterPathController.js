const CharacterPathStore = require('../../stores/westeros/characterPath');

class CharacterPathController {
    constructor() {
        this.characterPathStore = new CharacterPathStore();
    }

    async getAll(req, res) {
        let result = await this.characterPathStore.getAll();
        if (result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }

    async getByName(req, res) {
        let result = await this.characterPathStore.getByName(req.params.name);
        if (result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }
}

module.exports = CharacterPathController;