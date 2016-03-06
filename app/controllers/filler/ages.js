var Scraper = require(__appbase + 'controllers/scraper');
var Age = require(__appbase + 'models/age');
var Ages = require(__appbase + 'stores/ages');
var jsonfile = require('jsonfile');
var async = require('async');

module.exports = {
    fill: function(req, res) {
        console.log('Filling started.');

        var afterInsertion = function()
        {
            console.log('Filling done =).');
        }

        var file = __appbase + '../wikiData/ages.json';
        jsonfile.readFile(file, function(err, obj) {
            var filler = require(__appbase + 'controllers/filler/ages');
            if(obj != undefined)
                var cacheAge = ((new Date) - new Date(obj.createdAt));

            var ttl = require(__appbase + '../cfg/config.json');
            ttl = ttl.TTLWikiCache;

            if(obj == undefined || cacheAge > ttl) {
                if(obj != undefined && cacheAge > ttl)
                    console.log('Cache file outdated.');

                Scraper.scrapToFile(file, Scraper.getAges, function (err, obj) {
                    if (err != null) {
                        console.log(err)
                    }
                    else {
                        filler.insertToDb(obj.data,afterInsertion);
                    }
                });
            }
            else {
                console.log('Ages from cache file "'+file+'". Not scrapped from wiki.');
                filler.insertToDb(obj.data,afterInsertion);
            }
        });
    },
    clearAll: function(req,res) {
        Age.remove({}, function(err) {
            console.log('Ages collection removed');
        });
    },
    matchToModel: function(age) {
        // go through the properties of the house
        for(var z in age) {
            // ignore references for now, later gather the ids and edit the entries
            if ( z == 'startDate' || z == 'endDate' || z == 'predecessor' || z == 'successor' || !Age.schema.paths.hasOwnProperty(z)) {
                delete age[z];
            }


            // remove spaces and html tags
            if (typeof age[z] == 'string') {
                age[z] = age[z].trim().replace(/\*?<(?:.|\n)*?>/gm, '');
            }
        }

        return age;
    },
    insertToDb: function(ages, callback) {
        console.log('Inserting into db..');
        var i = 0;

        // iterate through houses
        async.forEach(ages, function (age, _callback) {
                var filler = require(__appbase + 'controllers/filler/ages');
                age = filler.matchToModel(age);
                // add house to db
                Ages.add(age, function (success, data) {
                    if (success != 1) {
                        console.log('Problem:' + data);
                    }
                    else {
                        console.log('SUCCESS: ' + data.name);
                    }
                    _callback();
                });
            },
            function (err) {
                callback(true);
            });
    },
    addReferences: function(req,res) {
        // TODO: Still every db entry has to be edited and the references updated
    }
};