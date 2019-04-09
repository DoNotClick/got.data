const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CharacterPathSchema = new Schema({
    name: String,
    path: Array
});

module.exports = mongoose.model('WesterosCharacterPath', CharacterPathSchema);
