const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CharacterSchema = new Schema({
    name            : {type: String, required: true},
    slug		    : {type: String, required: true, unique: true},
    titles          : [String],
    gender          : String,
    image		    : String,
    alive           : Boolean,
    birth           : Number,
    death           : Number,
    placeOfBirth    : {type: String, ref: "WesterosRegion"},
    placeOfDeath    : {type: String, ref: "WesterosRegion"},
    age             : {type: Number, min: 1, max: 200},

    mother          : {type: String, ref: 'WesterosCharacter'},
    father          : {type: String, ref: 'WesterosCharacter'},
    spouse          : [{type: String, ref: 'WesterosCharacter'}],
    children        : [{type: String, ref: 'WesterosCharacter'}],
    heir            : {type: String, ref: 'WesterosCharacter'},

    culture         : String,

    house           : {type: String, ref: "WesterosHouse"},
    allegiance      : [{type: String, ref: 'WesterosCharacter'}],

    books           : [String],
    placeOfLastVisit: {type: String, ref: "WesterosRegion"},
    hasPath		    : Boolean,

    plod            : {type: Number, default: 0.0},
    longevityStart  : Number,
    longevity       : [{type: Number}],
    plodB           : {type: Number, default: 0.0},
    plodC           : {type: Number, default: 0.0},
    longevityB      : [{type: Number}],
    longevityC      : [{type: Number}],
    longevityStartB  : Number,
    longevityStartC  : Number,

    createdAt       : {type: Date, default: Date.now},
    updatedAt       : {type: Date, default: Date.now}
}, { 
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
});

CharacterSchema.virtual('pagerank', {
    ref: 'WesterosPageRank',
    localField: 'slug',
    foreignField: 'title',
    justOne: true
});

module.exports = mongoose.model('WesterosCharacter', CharacterSchema);
