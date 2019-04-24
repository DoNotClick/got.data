const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HouseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: String,
    titles: [String],

    coatOfArms: String,
    words: String,
    currentLord: {
        type: String,
        ref: 'WesterosCharacter'
    },
    overlords: [
        {
            type: String,
            ref: 'WesterosHouse'
        }
    ],

    seat: String,
    region: String,
    ancestralWeapon: [String],

    founded: String,
    founder: String,
    cadetBranch: String,
    heir: String,

    isExtinct: Boolean,

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('WesterosHouse', HouseSchema);
