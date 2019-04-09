const TownStore = require('../../stores/fandom/townStore');

class TownController {
    constructor() {
        this.townStore = new TownStore();
    }

    async getAll(req, res) {
        let towns = await this.townStore.getAll();
        if (towns.success === 1) {
            res.status(200).send(towns.data);
        } else {
            res.status(404).send(towns.message);
        }
    }
    
    async getByName(req, res) {
        let towns = await this.townStore.getByName(req.params.name);
        if (towns.success === 1) {
            res.status(200).send(towns.data);
        } else {
            res.status(404).send(towns.message);
        }
    }

    async getByLocation(req, res) {
        let towns = await this.townStore.getByLocation(req.params.location);
        if (towns.success === 1) {
            res.status(200).send(towns.data);
        } else {
            res.status(404).send(towns.message);
        }
    }

    async getByRuler(req, res) {
        let towns = await this.townStore.getByRuler(req.params.name);
        if (towns.success === 1) {
            res.status(200).send(towns.data);
        } else {
            res.status(404).send(towns.message);
        }
    }

    async getByReligion(req, res) {
        let towns = await this.townStore.getByReligion(req.params.name);
        if (towns.success === 1) {
            res.status(200).send(towns.data);
        } else {
            res.status(404).send(towns.message);
        }
    }
}
module.exports = TownController;