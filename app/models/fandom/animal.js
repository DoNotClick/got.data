const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const AnimalFandomSchema = new Schema({
    name        : {type: String, required: true, unique: true},
    type        : {type: String},
    diet        : {type: String},
    status      : {type: String},
    habitat     : [{type: String}],
    range       : [{type: String}]
});

module.exports = mongoose.model('FandomAnimal', AnimalFandomSchema);
