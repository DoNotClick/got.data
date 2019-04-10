const CastleStore = require('../../stores/fandom/castle');

class CastleController {
    constructor() {
        this.castleStore = new CastleStore();
    }

    async getAll(req, res) {
        let castles = await this.castleStore.getAll();
        if (castles.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(castles.data);
        } else {
            res.status(404).send(castles.message);
        }
    }
    
    async getByName(req, res) {
        let castles = await this.castleStore.getByName(req.params.name);
        if (castles.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(castles.data);
        } else {
            res.status(404).send(castles.message);
        }
    }

    async getByLocation(req, res) {
        let castles = await this.castleStore.getByLocation(req.params.location);
        if (castles.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(castles.data);
        } else {
            res.status(404).send(castles.message);
        }
    }
}

module.exports = CastleController;