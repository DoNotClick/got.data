require(__dirname + '/../' + 'constants');

const config = require(__base + 'cfg/config');
const mongoose = require('mongoose');
const Filler = require("../app/controllers/filler/filler");

const collection = process.env.npm_config_collection;
const wiki = process.env.npm_config_wiki;

function getDbString(config) { //Create the DB connection string
    let dbConnection = "mongodb://";
    if (config.username.length > 0 && config.password.length > 0) {
        dbConnection += config.username + ":" + config.password + "@";
    }
    return dbConnection + config.uri + ":" + config.port + "/" + config.collection;
}

// 2 = update
let filler = new Filler(wiki, collection, 2);

mongoose.Promise = global.Promise;
mongoose.connect(getDbString(config.database), {useNewUrlParser: true}).then(
    (res) => {
        console.log('[Updater] '.green + "Successfully connected to the database.")
    }
).catch((err) => {
    console.log('[Updater] '.green + "Connection to database failed");
});

mongoose.connection.on('connected', async () => {
    try {
        await filler.fill();
        process.exit();
    } catch(e) {
        console.error('[Updater] '.green + e);
        process.exit();
    }
});