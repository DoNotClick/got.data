const BastardStore = require('../../stores/fandom/bastard');

class BastardController {
    constructor() {
        this.bastardStore = new BastardStore();
    }

    async getAll(req, res) {
        let bastards = await this.bastardStore.getAll();
        if (bastards.success === 1) {
            res.status(200).send(bastards.data);
        } else {
            res.status(404).send(bastards.message);
        }
    }
    
    async getByName(req, res) {
        let bastards = await this.bastardStore.getByName(req.params.name);
        if (bastards.success === 1) {
            res.status(200).send(bastards.data);
        } else {
            res.status(404).send(bastards.message);
        }
    }
}
module.exports = BastardController;