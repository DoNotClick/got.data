const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterLocationSchema = new Schema({
    name: {
        type: String,
        ref: 'WesterosCharacter',
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    locations: [String]
});

module.exports = mongoose.model('WesterosCharacterLocation', CharacterLocationSchema);
