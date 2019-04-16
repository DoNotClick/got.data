const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BayeseanAttributeSchema = new Schema({
    wiki: {
        type: String,
        required: true,
        unique: true
    },
    attributes: Schema.Types.Mixed
});

module.exports = mongoose.model('BayeseanAttribute', BayeseanAttributeSchema);
