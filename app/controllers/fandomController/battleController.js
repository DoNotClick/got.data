const BattleStore = require('../../stores/fandom/battleStore');

class BattleController {
    constructor() {
        this.battleStore = new BattleStore();
    }

    async getAll(req, res) {
        let battles = await this.battleStore.getAll();
        if (battles.success === 1) {
            res.status(200).send(battles.data);
        } else {
            res.status(404).send(battles.message);
        }
    }
    
    async getByName(req, res) {
        let battles = await this.battleStore.getByName(req.params.name);
        if (battles.success === 1) {
            res.status(200).send(battles.data);
        } else {
            res.status(404).send(battles.message);
        }
    }

    async getBySlug(req, res) {
        let battles = await this.battleStore.getBySlug(req.params.slug);
        if (battles.success === 1) {
            res.status(200).send(battles.data);
        } else {
            res.status(404).send(battles.message);
        }
    }

    async getByLocation(req, res) {
        let battles = await this.battleStore.getByLocation(req.params.location);
        if (battles.success === 1) {
            res.status(200).send(battles.data);
        } else {
            res.status(404).send(battles.message);
        }
    }

    async getByConflict(req, res) {
        let battles = await this.battleStore.getByConflict(req.params.conflict);
        if (battles.success === 1) {
            res.status(200).send(battles.data);
        } else {
            res.status(404).send(battles.message);
        }
    }
}
module.exports = BattleController;