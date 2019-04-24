const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContinentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    neighbors: [
        {
            type: String,
            ref: 'WesterosContinent'
        }
    ],
    cardinalDirection: String
});

module.exports = mongoose.model('WesterosContinent', ContinentSchema);
