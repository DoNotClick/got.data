require(__dirname + '/../' + 'constants');

const config = require('../cfg/config');
const mongoose = require('mongoose');
const Filler = require('../app/fillers/filler');

const collection = process.env.npm_config_collection;
const wiki = process.env.npm_config_wiki;

function getDbString(config) { //Create the DB connection string
    let dbConnection = 'mongodb://';
    if(config.username && config.password) {
        dbConnection += config.username + ':' + config.password + '@';
    }
    return dbConnection + config.uri + ':' + config.port + '/' + config.collection;
}

let filler = new Filler(wiki, collection, FILLER_POLICY_UPDATE);

mongoose.Promise = global.Promise;

function executeFiller() {
    return new Promise(function (resolve) {
        mongoose.connect(getDbString(config.database), {useNewUrlParser: true}).then(async (res) => {
            console.log('[UPDATE] '.green + 'Successfully connected to the database.');

            try {
                console.log("[UPDATE] ".green + "started updating. This can take a while");
                await filler.fill();

                resolve();
            } catch(e) {
                console.error('[UPDATE] '.green + e);

                resolve();
            }
        }).catch((err) => {
            console.error('[UPDATE] '.green + 'Connection to database failed');
            resolve();
        });
    });
}

executeFiller().then(function () {
    console.log("[UPDATE] ".green + "filler done");
    process.exit();
});