const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CharacterFandomSchema = new Schema({
    name            : {type: String, required: true, unique: true},
    slug            : {type: String, required: true},                           
    titles          : [{type: String}],                                                        
    gender          : String,
    image           : String,                                                       
    alive           : Boolean,
    birth           : Number,
    death           : Number,
    origin          : [{type: String}],
    mother          : {type: String, ref: 'CharacterFandom'},
    father          : {type: String, ref: 'CharacterFandom'},
    siblings        : [{type: String, ref: 'CharacterFandom'}],
    house           : {type: String, ref: 'HouseFandom'},
    spouse          : [{type: String, ref: 'CharacterFandom'}],
    lovers          : [{type: String, ref: 'CharacterFandom'}],

    culture        : [{type: String, ref: 'CultureFandom'}],
    religion       : [{type: String, ref: 'ReligionFandom'}],
    allegiances     : [{type: String, ref: 'CharacterFandom'}],

    first_seen      : {type: String, ref: 'EpisodeFandom'},
    seasons         : [{type: Number}],
    appearances     : [{type: String, ref: 'EpisodeFandom'}],
    actor           : String,
    createdAt       : {type: Date, default: Date.now},
    updatedAt       : {type: Date, default: Date.now},
});


module.exports = mongoose.model('CharacterFandom', CharacterFandomSchema);
