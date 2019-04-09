require(__dirname + '/' + 'constants');

const config = require('./cfg/config');

const UpdateFandom = require('./app/controllers/filler/updateFandom');
const UpdateWesteros = require('./app/controllers/filler/updateWesteros');
const UpdateMap = require('./app/controllers/filler/updateMap');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');

require('colors');
require('console-stamp')(console, {
    format: ':date(dd.mm.yyyy HH:MM:ss.l).yellow :label(7).white',
});
const app = express();

function getDbString(config) { //Create the DB connection string
    let dbConnection = "mongodb://";
    if (config.username.length > 0 && config.password.length > 0) {
        dbConnection += config.username + ":" + config.password + "@";
    }
    return dbConnection + config.uri + ":" + config.port + "/" + config.collection;
}

function routerAuthentication(req, res, next) {
    console.log('[API] '.green + 'Request incoming: ' + req.url);

    //Allow all GET requests as these do not modify data and we want users to be able to see that basic stuff
    if (req.method === 'GET') {
        return next();
    }

    //Otherwise check if we got a token
    let sentToken = req.query.token ? req.query.token : req.body.token;
    if (!sentToken) {
        console.log('[API] '.green + '401 - no token sent');
        return res.status(401).send({ //Send a nice little message to remind the user that he needs to supply a token
            message: 'Need to send a token',
            code: 401
        });
    }

    //Also check if the token is valid or not
    if (sentToken === accessToken) {
        return next();
    } else {
        console.log('[API] '.green + '401 - wrong token sent');
        return res.sendStatus(401);
    }
}

if (config.server.accessToken) {
    global.accessToken = config.server.accessToken;
} else {
    global.accessToken = uuidv4(); //Generate a default token when none is set
}

console.log('[API] '.green + 'Your requests must contain the following token: ' + accessToken);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(getDbString(config.database), {useNewUrlParser: true}).then(
    (res) => {
        console.log('[API] '.green + "Successfully connected to the database.")
    }
).catch((err) => {
    console.error('[API] '.green + "Connection to database failed");
    process.exit();
});

mongoose.connection.on('connected', async () => {
    try {
        const db = mongoose.connection.db;

        console.info('[API] '.green + 'MongoDB connection open');

        let updateFandom = new UpdateFandom(db).basicUpdate();
        let updateWesteros = new UpdateWesteros(db).basicUpdate();
        let updateMap = new UpdateMap(db).basicUpdate();

        await Promise.all([updateFandom, updateWesteros, updateMap]);

        console.info('[Updater] '.green + "all scraper done")
    } catch(e) {
        console.error('[Updater] '.green + e);
    }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false
}));

const showRouter = express.Router();
const bookRouter = express.Router();
const mapRouter = express.Router();

showRouter.use(routerAuthentication);
bookRouter.use(routerAuthentication);

require('./app/routes/fandom')(app, showRouter);
require('./app/routes/westeros')(app, bookRouter);
require('./app/routes/map')(app, mapRouter);

app.use('/api/show', showRouter);
app.use('/api/book', bookRouter);
app.use('/api/map', mapRouter);

app.use('/api', express.static('apiref.html'));
app.use('/api/book/images/', express.static('./misc/images/characters/book'));
app.use('/api/show/images/', express.static('./misc/images/characters/show'));

// api request not found
app.get('/api/book/*', function (req, res) {
    res.status(404).send('404');
});

app.get('/api/show/*', function (req, res) {
    res.status(404).send('404');
});

app.get('/api/map/*', function (req, res) {
    res.status(404).send('404');
});

//Redirect to api reference
app.get('*', function (req, res) {
    res.redirect('/api');
});

app.listen(3000);

console.log('[API] '.green + 'RESTful API server started on: 3000');