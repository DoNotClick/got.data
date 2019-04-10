const CityStore = require('../../stores/fandom/city');

class CityController {
    constructor() {
        this.citieStore = new CityStore();
    }

    async getAll(req, res) {
        let cities = await this.citieStore.getAll();
        if (cities.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cities.data);
        } else {
            res.status(404).send(cities.message);
        }
    }
    
    async getByName(req, res) {
        let cities = await this.citieStore.getByName(req.params.name);
        if (cities.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cities.data);
        } else {
            res.status(404).send(cities.message);
        }
    }

    async getByLocation(req, res) {
        let cities = await this.citieStore.getByLocation(req.params.location);
        if (cities.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cities.data);
        } else {
            res.status(404).send(cities.message);
        }
    }
}

module.exports = CityController;