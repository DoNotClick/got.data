const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const EpisodeSchema = new Schema({
    totalNr      : Number,
    nr           : Number,
    season       : Number,
    name         : {type: String, required: true, unique: true},
    characters   : [{type: String, ref: 'MapCharacter'}],
    airDate      : Date,
    episodeLength: {type: Number, min: 60, max: 70},

    predecessor: {type: String, ref: 'MapEpisode'},
    successor  : {type: String, ref: 'MapEpisode'},
    director   : String,

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('MapEpisode', EpisodeSchema);