const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CastleFandomSchema = new Schema({
    name        : {type: String, required: true, unique: true},
    location    : {type: String, ref: "FandomRegion"},
    type        : {type: String},
    religion    : [{type: String, ref: "FandomReligion"}],
    rulers      : [{type: String, ref: "FandomHouse"}],
    age         : {type: Number},
    founder     : [{type: String}]
});

module.exports = mongoose.model('FandomCastle', CastleFandomSchema);