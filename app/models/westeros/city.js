const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CitySchema = new Schema({
    name     : {type: String, required: true, unique: true},
    coordX   : String,												//Mongoose only supports Number (Integer)
    coordY   : String,												//For floats or doubles, it automatically converts it to String
    type     : String,
    priority : {type: Number, min: 0, max: 6},
    link     : String,
    continent: {type: String, ref: "WesterosContinent"},
    regions  : [{type: String, ref: "WesterosRegion"}]
});

module.exports = mongoose.model('WesterosCity', CitySchema);
