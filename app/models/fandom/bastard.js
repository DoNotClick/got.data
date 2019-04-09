const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BastardFandomSchema = new Schema({
    name      : {type: String, required: true, ref: 'FandomCharacter'}
});

module.exports = mongoose.model('FandomBastard', BastardFandomSchema);
