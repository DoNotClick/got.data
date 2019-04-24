const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    titles: [String],
    male: Boolean,
    culture: String,
    age: {
        type: Number,
        min: 1,
        max: 200
    },
    dateOfBirth: Number,
    dateOfDeath: Number,
    actor: String,
    mother: {
        type: String,
        ref: 'MapCharacter'
    },
    father: {
        type: String,
        ref: 'MapCharacter'
    },
    heir: {
        type: String,
        ref: 'MapCharacter'
    },
    placeOfBirth: {
        type: String,
        ref: 'MapRegion'
    },
    placeOfDeath: {
        type: String,
        ref: 'MapRegion'
    },
    house: {
        type: String,
        ref: 'WesterosHouse'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    spouse: {
        type: String,
        ref: 'MapCharacter'
    },
    allegiance: {
        type: String,
        ref: 'MapCharacter'
    },
    pageRank: Number,
    books: [String],
    placeOfLastVisit: {
        type: String,
        ref: 'MapRegion'
    },
    imageLink: String,
    slug: String,
    hasPath: Boolean
});

module.exports = mongoose.model('MapCharacter', CharacterSchema);