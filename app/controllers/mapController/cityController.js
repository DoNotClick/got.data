const CityStore = require('../../stores/westeros/city');

class CityController {
    constructor() {
        this.cityStore = new CityStore();
    }

    async getAll(req, res) {
        let cities = await this.cityStore.getAll();
        if (cities.success === 1) {
            res.status(200).send({"message": "Success", "data": cities.data});
        } else {
            res.status(404).send({"message": cities.message});
        }
    }
    
    async getByName(req, res) {
        let cities = await this.cityStore.getByName(req.params.name);
        if (cities.success === 1) {
            res.status(200).send({"message": "Success", "data": cities.data});
        } else {
            res.status(404).send({"message": cities.message});
        }
    }

    async getById(req, res) {
        let cities = await this.cityStore.getById(req.params.name);
        if (cities.success === 1) {
            res.status(200).send({"message": "Success", "data": cities.data});
        } else {
            res.status(404).send({"message": cities.message});
        }
    }
}

module.exports = CityController;