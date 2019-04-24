const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AgeFandomSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {type: Number}
});

module.exports = mongoose.model('FandomAge', AgeFandomSchema);
