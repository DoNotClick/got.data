const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    continent: {String},
    neighbors: [String],
    cultures: [String],
    events: [String],
    color: String,
    borders: [[String]],
    highlights: [String]
});

module.exports = mongoose.model('MapRegion', RegionSchema);