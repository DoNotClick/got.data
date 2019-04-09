const RegionStore = require('../../stores/map/regionStore');

class RegionController {
    constructor() {
        this.regionStore = new RegionStore();
    }

    async getAll(req, res) {
        let result = await this.regionStore.getAll();
        if (result.success === 1) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }

    async getByName(req, res) {
        let result = await this.regionStore.getByName(req.params.name);
        if (result.success === 1) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }

    async getById(req, res) {
        let result = await this.regionStore.getById(req.params.name);
        if (result.success === 1) {
            res.status(200).send({"message": "Success", "data": result.data});
        } else {
            res.status(404).send({"message": result.message});
        }
    }
}
module.exports = RegionController;