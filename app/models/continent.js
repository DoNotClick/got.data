var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ContinentSchema   = new Schema({
    name: {type: String, required: true},
	neighbors: [{type: Schema.Types.ObjectId, ref: "Region"}]
});

module.exports = mongoose.model('Continent', ContinentSchema);
