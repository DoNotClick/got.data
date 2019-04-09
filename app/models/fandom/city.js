const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CityFandomSchema = new Schema({
    name            : {type: String, required: true, unique: true},
    location        : {type: String, ref: "WesterosContinent"},
    type            : {type: String},
    rulers          : [{type: String}],
    religion        : [{type: String, ref: "FandomReligion"}],
    founder         : [{type: String, ref: "FandomCharacter"}],
    placesOfNote    : [{type: String}]
});

module.exports = mongoose.model('FandomCity', CityFandomSchema);
