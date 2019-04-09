const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const RegionFandomSchema = new Schema({
    name            : {type: String, required: true, unique: true},
    location        : {type: String, ref: "WesterosContinent"},
    geography       : {type: String},
    rulers          : [{type: String, ref: "FandomCharacter"}],
    religion        : [{type: String, ref: "FandomReligion"}],
    culture         : [{type: String, ref: "FandomCulture"}],
    regionCapital   : {type: String},
    cities          : [{type: String}],
    towns           : [{type: String}],
    castles         : [{type: String, ref: "FandomCastle"}],
    founder         : [{type: String, ref: "FandomCharacter"}],
    placesOfNote    : [{type: String}]
});

module.exports = mongoose.model('FandomRegion', RegionFandomSchema);
