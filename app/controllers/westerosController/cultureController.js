const CultureStore = require('../../stores/westeros/culture');

class CultureController {
    constructor() {
        this.cultureStore = new CultureStore();
    }

    async getAll(req, res) {
        let cultures = await this.cultureStore.getAll();
        if (cultures.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cultures.data);
        } else {
            res.status(404).send(cultures.message);
        }
    }
    
    async getByName(req, res) {
        let cultures = await this.cultureStore.getByName(req.params.name);
        if (cultures.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(cultures.data);
        } else {
            res.status(404).send(cultures.message);
        }
    }
}
module.exports = CultureController;