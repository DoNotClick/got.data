var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./cfg/config');

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
    var defController = require('./app/controllers/default');
    router.get('/', defController.init);

    var housesController = require('./app/controllers/house');
    router.post('/houses', housesController.addHouse);
    router.post('/houseTypes', housesController.addHouseType);
    router.get('/houses', housesController.getHouses);
    router.get('/houseTypes', housesController.getHouseTypes);
    router.get('/houses/:houseName', housesController.getHouseByName);
    router.get('/houses/byId/:houseId', housesController.getHouseById);
    router.delete('/houses/:houseId', housesController.removeHouse);
    router.put('/houses/:houseId', housesController.editHouse);
    router.delete('/houseTypes/:houseId', housesController.removeHouseType);


    var scraperController = require('./app/controllers/scraper');
    router.get('/scrapper/houses', scraperController.getAllHouses);
    router.get('/scrapper/characters', scraperController.getAllCharacters);

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