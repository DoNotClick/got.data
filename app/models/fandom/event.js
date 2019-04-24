var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventFandomSchema = new Schema({
    name: {type: String},
    slug: {type: String},
    conflict: {type: String},
    place: [
        {
            type: String,
            ref: 'FandomRegion'
        }
    ],
    dateOfEvent: Number,
    participants: [
        {
            type: String,
            ref: 'FandomCharacter'
        }
    ],
    factions: [
        {
            type: String,
            ref: 'FandomHouse'
        }
    ],
    leaders: [
        {
            type: String,
            ref: 'FandomCharacter'
        }
    ],
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

module.exports = mongoose.model('FandomEvent', EventFandomSchema);

