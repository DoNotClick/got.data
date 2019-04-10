const AssassinStore = require('../../stores/fandom/assassin');

class AssassinController {
    constructor() {
        this.assassinStore = new AssassinStore();
    }

    async getAll(req, res) {
        let assassins = await this.assassinStore.getAll();
        if (assassins.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(assassins.data);
        } else {
            res.status(404).send(assassins.message);
        }
    }
    
    async getByName(req, res) {
        let assassins = await this.AssassinStore.getByName(req.params.name);
        if (assassins.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(assassins.data);
        } else {
            res.status(404).send(assassins.message);
        }
    }
}

module.exports = AssassinController;