const ContinentStore = require('../../stores/westeros/continent');

class ContinentController {
    constructor() {
        this.continentStore = new ContinentStore();
    }

    async getAll(req, res) {
        let continents = await this.continentStore.getAll();
        if (continents.success === 1) {
            res.status(200).send(continents.data);
        } else {
            res.status(404).send(continents.message);
        }
    }
    
    async getByName(req, res) {
        let continents = await this.continentStore.getByName(req.params.name);
        if (continents.success === 1) {
            res.status(200).send(continents.data);
        } else {
            res.status(404).send(continents.message);
        }
    }
}
module.exports = ContinentController;