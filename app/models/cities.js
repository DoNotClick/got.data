var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CitySchema   = new Schema({
    name: {type: String, required: true},
	coordX: String,												//Mongoose only supports Number (Integer)
	coordY: String,												//For floats or doubles, it automatically converts it to String
	type: String,
	priority: { type: Number, min: 0, max: 6},
	link: String,
	continent: {type: Schema.Types.ObjectId, ref: "Continent"},
    neighbors:[{type: Schema.Types.ObjectId, ref: "Region"}],
    cultures: [{type: Schema.Types.ObjectId, ref: "Culture"}],
    events: [{type: Schema.Types.ObjectId, ref: "Event"}]
});

module.exports = mongoose.model('City', CitySchema);
