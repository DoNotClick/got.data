const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const EventSchema = new Schema({
    name: {type: String}, // not required and unique since name is not always existing.
    date: Number,
    age : {type: String, ref: 'WesterosAge'},

    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('WesterosEvent', EventSchema);
