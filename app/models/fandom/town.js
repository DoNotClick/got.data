const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const TownFandomSchema = new Schema({
    name        : {type: String, required: true, unique: true},
    location    : {type: String, ref: "WesterosContinent"},
    type        : {type: String},
    rulers      : [{type: String}],
    religion    : [{type: String, ref: "FandomReligion"}]
});

module.exports = mongoose.model('FandomTown', TownFandomSchema);
