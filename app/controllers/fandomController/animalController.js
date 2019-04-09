const AnimalStore = require('../../stores/fandom/animalStore');

class AnimalController {
    constructor() {
        this.animalStore = new AnimalStore();
    }

    async getAll(req, res) {
        let animals = await this.animalStore.getAll();
        if (animals.success === 1) {
            res.status(200).send(animals.data);
        } else {
            res.status(404).send(animals.message);
        }
    }
    
    async getByName(req, res) {
        let animals = await this.animalStore.getByName(req.params.name);
        if (animals.success === 1) {
            res.status(200).send(animals.data);
        } else {
            res.status(404).send(animals.message);
        }
    }

    async getByHabitat(req, res) {
        let animals = await this.animalStore.getByHabitat(req.params.habitat);
        if (animals.success === 1) {
            res.status(200).send(animals.data);
        } else {
            res.status(404).send(animals.message);
        }
    }
}
module.exports = AnimalController;