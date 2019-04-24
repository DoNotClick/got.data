const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BattleFandomSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {type: String},
    conflict: {type: String},
    dateOfBattle: {type: Number},
    place: [
        {
            type: String,
            ref: 'FandomRegion'
        }
    ],
    factionsOne: [
        {
            type: String,
            ref: 'FandomHouse'
        }
    ],
    factionsTwo: [
        {
            type: String,
            ref: 'FandomHouse'
        }
    ],
    commandersOne: [
        {
            type: String,
            ref: 'FandomCharacter'
        }
    ],
    commandersTwo: [
        {
            type: String,
            ref: 'FandomCharacter'
        }
    ],
    forcesOne: [{type: String}],
    forcesTwo: [{type: String}],
    casualties: [
        {
            type: String,
            ref: 'FandomCharacter'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FandomBattle', BattleFandomSchema);
