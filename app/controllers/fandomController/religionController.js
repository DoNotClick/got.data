
const ReligionStore = require('../../stores/fandom/religionStore');
class ReligionController {
    constructor() {
        this.relStore = new ReligionStore();
    }

    async getAll(req, res) {
        let religions = await this.relStore.getAll();
        if (religions.success === 1) {
            res.status(200).send(religions.data);
        } else {
            res.status(404).send(religions.message);
        }
    }
    
    async getByTitle(req, res) {
        let religions = await this.relStore.getByName(req.params.name);
        if (religions.success === 1) {
            res.status(200).send(religions.data);
        } else {
            res.status(404).send(religions.message);
        }
    }
}
module.exports = ReligionController;