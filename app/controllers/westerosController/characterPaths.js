const CharacterPathStore = require('../../stores/westeros/characterPath');

class CharacterPathController {
    constructor() {
        this.characterPathStore = new CharacterPathStore();
    }

    async getAll(req, res) {
        let characters = await this.characterPathStore.getAll();
        if (characters.success === STORE_RESPONSE_SUCCESS) {
            return res.status(200).send(characters.data);
        } else {
            return res.status(404).send(characters.message);
        }
    }
    
    async getByName(req, res) {
        let characters = await this.characterPathStore.getByName(req.params.name);
        if (characters.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(characters.data);
        } else {
            res.status(404).send(characters.message);
        }
    }
}
module.exports = CharacterPathController;