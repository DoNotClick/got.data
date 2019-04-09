const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ReligionFandomSchema = new Schema({
    name        : {type: String, required: true, unique: true},
    slug        : String,
    image       : String,

    type        : [String],
    clergy      : {type: String, ref: "FandomCharacter"},
    locations   : [{type: String, ref: "FandomRegion"}],
    leaders     : [{type: String, ref: "FandomCharacter"}],
    center      : String,

    neighbors   : [{type: String, ref: "FandomRegion"}],
    cultures    : [{type: String, ref: "FandomCulture"}],
    events      : [{type: String, ref: "FandomEvent"}],
});

module.exports = mongoose.model('FandomReligion', ReligionFandomSchema);

