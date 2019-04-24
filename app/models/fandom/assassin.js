const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssassinFandomSchema = new Schema({
    slug: {
        type: String,
        required: true
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

AssassinFandomSchema.virtual('assassin', {
    ref: 'FandomCharacter',
    localField: 'slug',
    foreignField: 'slug',
    justOne: true
});

let autoPopulate = function (next) {
    this.populate('assassin');
    next();
};

AssassinFandomSchema
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate);

module.exports = mongoose.model('FandomAssassin', AssassinFandomSchema);
