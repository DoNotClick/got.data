var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./cfg/config');
global.__base = __dirname + '/';
global.__appbase = __dirname + '/app/';

//Create the DB connection string
var databaseParams = config.database;
var dbConnection = "mongodb://"
if (databaseParams.username.length > 0 && databaseParams.password.length > 0) {
    dbConnection += databaseParams.username + ":" + databaseParams.password + "@";
}
dbConnection += databaseParams.uri + ":" + databaseParams.port + "/" + databaseParams.collection;

//Create the connection to mongodb
console.log("Going to connect to " + dbConnection);
mongoose.connect(dbConnection);
var db = mongoose.connection;

// CONNECTION EVENTS: When successfully connected
db.on('connected', function () {
    console.log('Mongoose connected');
});

// If the connection throws an error
db.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
db.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

db.on('open', function () {
    // to get the data from a POST
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());


    var router = express.Router();

    // this happens for every request
    router.use(function (req, res, next) {
        console.log('Request incoming.');

        // HERE LOGIN TEST

        next(); // go to the specialized request
    });

    /*
     #### Routes
     */

    require(__base + 'routes')(app, router);

    /*
     ###
     */

    // prefix for all routes
    app.use('/api', router);

    //Route for doc folder
    app.use('/doc', express.static('apidoc'));

    //Redirect to default page
    app.get('*', function (req, res) {
        res.redirect('/api');
    });

    //Start listening for requests
    app.listen(config.server.port);
    console.log('Node server is listening on port ' + config.server.port);
});