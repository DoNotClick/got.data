
'use strict';
const HouseStore = require('../../stores/fandom/house');
class HouseController {
    constructor() {
        this.houseStore = new HouseStore();
    }

    async getAll(req, res) {
        let houses = await this.houseStore.getAll();
        if (houses.success === 1) {
            return res.status(200).send(houses.data);
        } else {
            return res.status(404).send(houses.message);
        }
    }
    
    async getByName(req, res) {
        let name = req.params.name ? req.params.name : req.body.name;
        let houses = await this.houseStore.getByName(name);
        if (houses.success === 1) {
            res.status(200).send(houses.data);
        } else {
            res.status(404).send(houses.message);
        }
    }
}
module.exports = HouseController;