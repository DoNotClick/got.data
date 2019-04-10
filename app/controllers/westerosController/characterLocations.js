const CharacterLocationStore = require('../../stores/westeros/characterLocation');

class CharacterLocationController {
    constructor() {
        this.characterLocationStore = new CharacterLocationStore();
    }

    async getAll(req, res) {
        let characterLocations = await this.characterLocationStore.getAll();
        if (characterLocations.success === STORE_RESPONSE_SUCCESS) {
            return res.status(200).send({message: 'Success', data: characterLocations.data});
        } else {
            return res.status(404).send(characterLocations.message);
        }
    }
    
    async getByName(req, res) {
        let name = req.params.name ? req.params.name : req.body.name;
        let characterLocations = await this.characterLocationStore.getByName(name);
        if (characterLocations.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(characterLocations.data);
        } else {
            res.status(404).send(characterLocations.message);
        }
    }

    async getBySlug(req, res) {
        let slug = req.params.slug ? req.params.slug : req.body.slug;
        let characterLocations = await this.characterLocationStore.getBySlug(slug);
        if (characterLocations.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(characterLocations.data);
        } else {
            res.status(404).send(characterLocations.message);
        }
    }
}
module.exports = CharacterLocationController;