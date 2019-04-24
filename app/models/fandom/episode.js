const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EpisodeFandomSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    number: Number,
    season: Number,
    episode: Number,
    image: String,
    date: Date,
    viewers: Number,

    runtime: Number,
    written_by: [String],
    directed_by: String,
    preview_text: String,

    characters: [
        {
            type: String,
            ref: 'FandomCharacter'
        }
    ],
    deaths: [
        {
            type: String,
            ref: 'FandomCharacter'
        }
    ],
    places: [
        {
            type: String,
            ref: 'FandomCity'
        }
    ],

    predecessor: {
        type: String,
        ref: 'FandomEpisode'
    },
    successor: {
        type: String,
        ref: 'FandomEpisode'
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FandomEpisode', EpisodeFandomSchema);
