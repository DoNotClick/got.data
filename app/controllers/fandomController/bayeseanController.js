
'use strict';
const BayeseanAttributeStore = require('../../stores/bayeseanAttributes');

class BayeseanAttributeController {
    constructor() {
        this.baStore = new BayeseanAttributeStore();
    }

    async getAll(req, res) {
        let characters = await this.baStore.getByWiki("fandom");

        if (characters.success === 1) {
            return res.status(200).send(characters.data);
        } else {
            return res.status(404).send(characters.message);
        }
    }

    async update(req, res) {
        let attributes = req.params.attributes ? req.params.attributes : req.body.attributes;

        let bayeseanAttributes = await this.baStore.updateWiki("fandom", attributes);

        if (bayeseanAttributes.success === 1) {
            res.status(200).send(bayeseanAttributes.message);
        } else {
            res.status(404).send(bayeseanAttributes.message);
        }
    }
}

module.exports = BayeseanAttributeController;