const CityStore = require('../../stores/westeros/city');

class CityController {
    constructor() {
        this.cityStore = new CityStore();
    }

    async getAll(req, res) {
        let cities = await this.cityStore.getAll();
        if (cities.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cities.data);
        } else {
            res.status(404).send(cities.message);
        }
    }
    
    async getByName(req, res) {
        let cities = await this.cityStore.getByName(req.params.name);
        if (cities.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cities.data);
        } else {
            res.status(404).send(cities.message);
        }
    }

    async getByContinent(req, res) {
        let cities = await this.cityStore.getByContinent(req.params.continent);
        if (cities.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cities.data);
        } else {
            res.status(404).send(cities.message);
        }
    }
}
module.exports = CityController;