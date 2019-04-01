const AgeStore = require('../../stores/westeros/ages');

class AgeController {
    constructor() {
        this.ageStore = new AgeStore();
    }

    async getAll(req, res) {
        let ages = await this.ageStore.getAll();
        if (ages.success === 1) {
            res.status(200).send(ages.data);
        } else {
            res.status(404).send(ages.message);
        }
    }
    
    async getByName(req, res) {
        let ages = await this.ageStore.getByName(req.params.name);
        if (ages.success === 1) {
            res.status(200).send(ages.data);
        } else {
            res.status(404).send(ages.message);
        }
    }
}
module.exports = AgeController;