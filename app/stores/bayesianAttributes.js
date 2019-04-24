const bayesianAttributes = require('../models/bayesianAttributes');

class BayesianAttributeStore {
    constructor() {
    }

    async getByWiki(wiki) {
        try {
            let data = await bayesianAttributes.findOne({wiki: wiki});

            if(!data) {
                return {
                    success: 1,
                    data: {}
                };
            } else {
                return {
                    success: 1,
                    data: data['attributes']
                };
            }

        } catch(e) {
            return {
                success: 0,
                message: 'error in database query! - ' + e
            };
        }
    }

    async updateWiki(wiki, attributes) {
        try {
            let data = await bayesianAttributes.findOne({wiki: wiki});

            if(!data) {
                await bayesianAttributes.create({
                    wiki: wiki,
                    attributes: attributes
                });

                return {
                    success: 1,
                    message: 'wiki has been updated'
                };
            } else {
                // let arr = JSON.parse(longevity);
                data.attributes = attributes;
                await data.save();

                return {
                    success: 1,
                    message: 'wiki has been updated'
                };
            }
        } catch(e) {
            return {
                success: 0,
                message: 'error in database query! - ' + e
            };
        }
    }
}

module.exports = BayesianAttributeStore;