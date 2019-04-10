const HouseStore = require('../../stores/westeros/house');

class HouseController {
    constructor() {
        this.houseStore = new HouseStore();
    }

    async getAll(req, res) {
        let houses = await this.houseStore.getAll();
        if (houses.success === STORE_RESPONSE_SUCCESS) {
            return res.status(200).send(houses.data);
        } else {
            return res.status(404).send(houses.message);
        }
    }
    
    async getByName(req, res) {
        let name = req.params.name ? req.params.name : req.body.name;
        let houses = await this.houseStore.getByName(name);
        if (houses.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(houses.data);
        } else {
            res.status(404).send(houses.message);
        }
    }
}
module.exports = HouseController;