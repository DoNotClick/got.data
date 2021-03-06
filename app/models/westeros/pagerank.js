const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageRankWesterosSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    rank: Number
});

module.exports = mongoose.model('WesterosPageRank', PageRankWesterosSchema);
