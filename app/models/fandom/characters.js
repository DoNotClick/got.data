const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CharacterSchema = new Schema({
    name            : {type: String, required: true, unique: true},
    slug            : {type: String, required: true},
    nicknames       : [String],                               
    titles          : [String],                                                        
    gender          : String,
    image           : String,                                                       
    alive           : Boolean,
    birth           : Number,
    death           : Number,
    origin          : String,
    mother          : {type: String, ref: 'Character'},
    father          : {type: String, ref: 'Character'},
    siblings        : [{type: String, ref: 'Character'}],
    house           : {type: String, ref: 'House'},
    spouse          : {type: String, ref: 'Character'},
    lovers          : [{type: String, ref: 'Character'}],

    cultures        : [{type: String, ref: 'Culture'}],
    religions       : [{type: String, ref: 'Religion'}],
    allegiances     : [{type: String, ref: 'Character'}],

    first_seen      : {type: String, ref: 'Episode'},
    seasons         : [Number],
    appearances     : [{type: String, ref: 'Episode'}],

    actor           : String,
    createdAt       : {type: Date, default: Date.now},
    updatedAt       : {type: Date, default: Date.now},
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

CharacterSchema.virtual('pagerank', {
    ref: 'PageRank',
    localField: 'slug',
    foreignField: 'title'
    // justOne: true
});


module.exports = mongoose.model('Character', CharacterSchema, 'show');