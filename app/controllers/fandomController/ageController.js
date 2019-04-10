const AgeStore = require('../../stores/fandom/age');

class AgeController {
    constructor() {
        this.ageStore = new AgeStore();
    }

    async getAll(req, res) {
        let ages = await this.ageStore.getAll();
        if (ages.success === STORE_RESPONSE_SUCCESS) {
            return res.status(200).send(ages.data);
        } else {
            return res.status(404).send(ages.message);
        }
    }
    
    async getByName(req, res) {
        let name = req.params.name ? req.params.name : req.body.name;
        let ages = await this.ageStore.getByName(name);
        if (ages.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(ages.data);
        } else {
            res.status(404).send(ages.message);
        }
    }

    async getByAge(req, res) {
        let ages = await this.ageStore.getByAge(req.params.age);
        if (ages.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(ages.data);
        } else {
            res.status(404).send(ages.message);
        }
    }
}

module.exports = AgeController;