const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const RegionSchema = new Schema({
    name      : {type: String, required: true, unique: true},
    continent : {type: Schema.Types.ObjectId, ref: "WesterosContinent"},
    neighbors : [{type: Schema.Types.ObjectId, ref: "WesterosRegion"}],
    cultures  : [{type: Schema.Types.ObjectId, ref: "WesterosCulture"}],
    events    : [{type: Schema.Types.ObjectId, ref: "WesterosEvent"}],
    color     : String,
    borders   : [[String]],
    highlights: [String]										//Used for highlighting regions with polygons
});

module.exports = mongoose.model('WesterosRegion', RegionSchema);
