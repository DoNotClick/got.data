const RegionStore = require('../../stores/fandom/regionStore');

class RegionController {
    constructor() {
        this.regionStore = new RegionStore();
    }

    async getAll(req, res) {
        let regions = await this.regionStore.getAll();
        if (regions.success === 1) {
            res.status(200).send(regions.data);
        } else {
            res.status(404).send(regions.message);
        }
    }
    
    async getByName(req, res) {
        let regions = await this.regionStore.getByName(req.params.name);
        if (regions.success === 1) {
            res.status(200).send(regions.data);
        } else {
            res.status(404).send(regions.message);
        }
    }

    async getByLocation(req, res) {
        let regions = await this.regionStore.getByLocation(req.params.location);
        if (regions.success === 1) {
            res.status(200).send(regions.data);
        } else {
            res.status(404).send(regions.message);
        }
    }
}
module.exports = RegionController;