var House = require("../models/house");
var bot = require("nodemw");
var client = new bot({
	server: "awoiaf.westeros.org",
	path: "/api.php",
	concurrency: "5"
});
var jsonfile = require('jsonfile');


module.exports = {

	/*
	* Returns a list of house names
	*/
    getHouseNames: function (callback) {

        //Setup the mediawiki bot
        



        var houses = [];
		
        //Iterate through all the houses

        console.log("Loading all houses from the wiki. This might take a while");

        var apiCallback = function (err, info, next, data) {
			if(data != null) {
				for (j = 0; j < data.query.search.length; j++) {
					//console.log(info);
					var title = String(data.query.search[j].title);
					if (title === null) {
						break;
					}
					
					console.log("House " + title);

					houses.push(title);
				}
				if (houses.length == data.query.searchinfo.totalhits) {
					callback(houses);
				}
			}
        };

        for (i = 0; i < 540; i = i + 10) {
            //Setup up the api parameters
            var params = {
                action: "query",
                titles: "Houses%20Of%20Westeros",
                list: "search",
                srsearch: "house",
                format: "json",
                sroffset: String(i)
            };

            //Get results from api
            client.api.call(params, apiCallback);
        }
    },
	
	
	/*
	* Call when you want to fetch all house information
	*/
	getHouses : function(callback) {
		
		/*
		sc = require("./scraper");
		sc.getHouseNames(function(houses) {
			*/
		/*
		* For testing purposes(and faster results) uncomment this section and comment the above code section.
		*/
		
		var fs = require("fs");
		fs.readFile('./sample data/houses.txt', function (err, data) {
			if (err) {
			   return console.error(err);
			}
			string_array = data.toString().split("**");
			houses = JSON.parse(string_array[0]);
			fields = JSON.parse(string_array[1]);
		
				
					

			var housesCollection = [];
			var scraper = require("./scraper");
			for(i = 0; i <houses.length; i++) {
				scraper.getSingleHouse(houses[i], function(house) {
					housesCollection.push(house);
					if(housesCollection.length == houses.length) {
						callback(housesCollection);
					}
				});
			}
		});
	},
	
	/*
	* Fetches details for one house
	*/
	getSingleHouse : function(houseName, callback) {

		
		
			//console.log(houseName);
			var pageName = houseName.replace(" ", "_");
			
			var params = {
				action: "parse",
				page: pageName,
				format: "json"
			};	


			
			var house = {};			
				
			client.api.call(params, function (err, info, next, data) {
				if(data != null) {
					var arr = data.parse.text["*"].match(/<th\sscope(.*?)>(.*?)<\/td><\/tr>/g);				
					if(arr != null) {	
						house["name"] = houseName;

						for(i = 0; i < arr.length; i++) {
							var tempName = arr[i].match(/<th\sscope(.*?)>(.*?)<\/th>/g)[0].match(/>(.*?)</g);
							var name = tempName[0].substring(1, tempName[0].length-1);
							var tempValue = arr[i].match(/<td\sclass=\"\"\sstyle=\"\">(.*?)<\/td>/g)[0].match(/\">(.*?)<\/td>/g);	
							var value = tempValue[0].substring(1, tempValue[0].length-1);
							newValue = [];
							if(value.indexOf("href") != -1) {
								value = value.match(/\">(.*?)<\/a>/)[0];
								value = value.substring(2, value.length-4);
							}
							else {
								value = value.substring(1, value.length-4);
							}
							/*
							* Get the other information
							*/
							
							if(value != null) {
								name = name.toLowerCase();
								if(name == "coat of arms") {
									name = "coatOfArms";
								}
								else if(name == "current lord") {
									name = "currentLord";
								}
								else if(name == "cadet branch") {
									name = "cadetBranch";
								}
								else if(name == "ancestral weapon") {
									name = "ancestralWeapon";
								}
								house[name] = value;
							}
							
							/*
							*
							*/
						}
					}
				}
				//console.log(house);
				callback(house);
			});
	},
	
	/*
	* Fetches details for one character
	*/
	getSingleCharacter : function(characterName, callback) {
		console.log("start getSingleCharacter");


		var pageName = characterName.replace(" ", "_");

		var params = {
			action: "parse",
			page: pageName,
			format: "json"
		};	

		var character = {};			
		client.api.call(params, function (err, info, next, data) {
			if(data != null) {
				var arr = data.parse.text["*"].match(/<th\sscope(.*?)>(.*?)<\/td><\/tr>/g);				
				if(arr != null) {	
					character["name"] = characterName;
					for(i = 0; i < arr.length; i++) {
						var tempName = arr[i].match(/<th\sscope(.*?)>(.*?)<\/th>/g)[0].match(/>(.*?)</g);
						var name = tempName[0].substring(1, tempName[0].length-1);
						var tempValue = arr[i].match(/<td\sclass=\"\"\sstyle=\"\">(.*?)<\/td>/g)[0].match(/\">(.*?)<\/td>/g);	
						var value = tempValue[0].substring(1, tempValue[0].length-1);
						newValue = [];
						if(value.indexOf("href") != -1) {
							value = value.match(/\">(.*?)<\/a>/)[0];
							value = value.substring(2, value.length-4);
						}
						else {
							value = value.substring(1, value.length-4);
						}
						/*
						* Get the other information
						*/
						
						if(value != null) {
							name = name.toLowerCase();
							if(name == "born") {
								name = "dateOfBirth";
							}
							else if(name == "died") {
								name = "dateOfDeath";
							}
							else if(name == "played by") {
								name = "actor";
							}
							else if(name == "allegiance") {
								name = "house";
							}
							character[name] = value;
						}
						
						/*
						*
						*/
					}
				}
			}
			
			//console.log(character);
			callback(character);
		});
	},

	/*
	* Call when you want to fetch all house information
	*/
	getCharacters : function(callback) {
		
		
		var scraper = require("./scraper");
		scraper.getCharacterNames(function(characters) {
		
			var charactersCollection = [];

			
			console.log(characters.length);
			
			for(i = 0; i < characters.length; i++) {
				scraper.getSingleCharacter(characters[i], function(character) {
					charactersCollection.push(character);
					if(charactersCollection.length == characters.length) {
						callback(charactersCollection);
					}
				});
			}
		});
	},

	/*
	* Returns a list of character names
	*/
    getCharacterNames: function (callback) {

        //Setup the mediawiki bot
        var bot = require("nodemw");

        var client = new bot({
            server: "awoiaf.westeros.org",
            path: "/api.php"
        });
        var params = {
            action: "parse",
            page: "List_of_characters",
            prop: "links",
            format: "json"
        };

        var characters = [];
        //Iterate through all the Characters

        console.log("Loading all character names from the wiki. This might take a while");
        client.api.call(params, function (err, info, next, data) {
            for (i = 0; i < data.parse.links.length; i++) {
				
				title = String(data.parse.links[i]["*"]);
					if (title === null) {
						break;
					}
				characters.push(title);
            }
			console.log("All character names loaded");
			callback(characters);
        });
    },
	
	getAges : function(callback) {
		 var bot = require("nodemw");

        var client = new bot({
            server: "awoiaf.westeros.org",
            path: "/api.php"
        });
        var params = {
            action: "parse",
            page: "Timeline_of_major_events",
            format: "json"
        };
		var ages = [];
		client.api.call(params, function(err, info, next, data) {
			
			var arr = data["parse"]["text"]["*"].match(/<span\sclass=\"tocnumber(.*?)>(.*?)<\/a>/g);
			for(i = 1; i < arr.length-2; i++) {
				tmp = arr[i].match(/\">(.*?)<\/span>/g);
				ageName = tmp[1].substring(2, tmp[1].length-7);
				var age = {};
				age["name"] = ageName;
				ages.push(age);
			}
			for(i = 0; i < ages.length; i++) {
				console.log(ages[i]);
				if(i > 0 && i < ages.length-1) {
					ages[i]["predecessor"] = ages[i-1]["name"];
					ages[i]["successor"] = ages[i+1]["name"];
				}
				if(i == 0) {
					ages[i]["successor"] = ages[i+1]["name"];
				}
				if(i == ages.length-1) {
					ages[i]["predecessor"] = ages[i-1]["name"];
				}
			}
			callback(ages);
		});
	},
	
    getAllHistory: function (req, res) {

        //Setup the mediawiki bot
        var bot = require("nodemw");

        var client = new bot({
            server: "awoiaf.westeros.org",
            path: "/api.php"
        });
        var params = {
			action: "query",
			titles: "Timeline_of_major_events",
			list: "search",
			srsearch: "mw-headline",
			sroffset: String(i)
        };
		


        history = [];

        //Iterate through all histroy

        console.log("Loading all history from the wiki. This might take a while");
        client.api.call(params, function (err, info, next, data) {
            for (i = 0; i < data[""][""].length; i++) {
                characters.push(data[""][""][i]["*"]);
            }
            res.status(200).json(history);
        });

        res.status(400).json({message: 'Error', error: "something went wrong"});
    },
    
    getCultures: function (callback) {
		console.log("start getCultures");

		var client = new bot({
		server: "awoiaf.westeros.org",
		path: "/api.php"
		});
	
		var params = {
			action: "parse",
			page: "Portal:Culture",
			format: "json"
		};
	
	    client.api.call(params, function (err, info, next, data) {

			var allData = data["parse"]["text"]["*"];
			var result = allData.match(/<tr>(.|\n)*?<\/tr>/g); 
			var listForSevenKingdoms, listForBeyondTheWall, listForEssos, listForAncientTimes;
			var cultures  = [];

			for (i = 0; i < result.length; i++) {
			    if(result[i].match(/(Seven Kingdoms)/)){
			    	listForSevenKingdoms = result[i].match(/title="([^"]*)"/g);
			    	listForSevenKingdoms.shift();
			    	for(j = 0; j < listForSevenKingdoms.length; j++) {
						var culture = {};
			    		culture["name"] = listForSevenKingdoms[j].substring(7, listForSevenKingdoms[j].length-1);
						cultures.push(culture);
			    	}
			    }
			    /*
			    if(result[i].match(/(Beyond the Wall)/)){
			    	listForBeyondTheWall = result[i].match(/title="([^"]*)"/g);
					for(j=0; j<listForBeyondTheWall.length; j++){
			    		var culture = {};
			    		culture["name"] = listForBeyondTheWall[j].substring(7, listForBeyondTheWall[j].length-1);
						cultures.push(culture);
			    	}
			    }
			    */
			    if(result[i].match(/Essos/)){
			    	listForEssos = result[i].match(/title="([^"]*)"/g);
			    	listForEssos.shift();
			    	for(j = 0; j < listForEssos.length; j++) {
			    		var culture = {};
			    		culture["name"] = listForEssos[j].substring(7, listForEssos[j].length-1);
						cultures.push(culture);
			    	}
			    }
			    /*
			    if(result[i].match(/(From ancient times)/)){
			    	listForAncientTimes = result[i].match(/title="([^"]*)"/g);
			    	for(j=0; j<listForAncientTimes.length; j++){
			    		var culture = {};
			    		culture["name"] = listForAncientTimes[j].substring(7, listForAncientTimes[j].length-1);
						cultures.push(culture);
			    	}
			    }
				*/
			}
			callback(cultures);
        });
    },

	getSingleRegion: function(regionName, callback) {
		var scraper = require("./scraper");
		scraper.getRegions(function(regions) {
			for(i = 0; i < regions.length; i++) {
				if(regions[i].name == regionName) {
					callback(regions[i]);
				}
			}
		});
	},
	
    getRegions: function (callback) {
		console.log("start getRegions");
        //Setup the mediawiki bot

        var params = {
            action: "parse",
            page: "Portal:Geography",
            format: "json"
        };

        var regions = [];

        //Iterate through all Regions

        //console.log("Loading all regions from the wiki. This might take a while");
        client.api.call(params, function (err, info, next, data) {

			var section = data["parse"]["text"]["*"].split("Regions");
			for(i = 1; i < 4; i++) {
				var continents = section[i].split("<\/li><\/ul>");
				
				var str = continents[0].match(/\">(.*?)<\/a>/g);
				for(j = 0; j < str.length; j++) {
					str[j] = str[j].substring(2, str[j].length-4);
					var region = {};
					region["name"] = str[j];
					regions.push(region);
				}
			}
			callback(regions);

        });
    },

    getEpisodeNames: function (callback) {

        //Setup the mediawiki bot

        var params = {
            action: "parse",
            page: "Portal:TV_Show",
            format: "json"
        };

        var episodes = [];

        //Iterate through all the episodes

        console.log("Loading all episodes from the wiki. This might take a while");
        client.api.call(params, function (err, info, next, data) {
			arr =data.parse.text["*"].match(/<li>(.*?)<\/li>/g);
			for(i = 0; i < arr.length; i++) {
				subArr = arr[i].match(/\stitle=\"(.*?)\"/g);
				//var episode = {};
				episodes.push(subArr[0].substring(8,subArr[0].length-1));
				//episodes.push(episode);
			}
			callback(episodes);
        });
    },
	
	getEpisodes : function(callback) {
		var scraper = require("./scraper");
		scraper.getEpisodeNames(function(episodes) {
			var episodesCollection = [];
			var nr = episodes.length;
			console.log(episodes.length + " episodes to fetch");
			for(i = 0; i < episodes.length; i++) {
				scraper.getSingleEpisode(episodes[i], function(episode) {
					if(episode.name != null) {
						episodesCollection.push(episode);
						console.log("Fetched " + episode.name);
					}
					else {
						nr--;
					}
					if(episodesCollection.length == nr) {
						callback(episodesCollection);
					}
				});
			}
		});
	},
	
	getSingleEpisode : function(episodeName, callback) {
		//console.log("start getSingleEpisode: " + episodeName);

		

			var pageName = episodeName.replace(" ", "_");

			var params = {
				action: "parse",
				page: pageName,
				format: "json"
			};	
			
			var episode = {};			
			client.api.call(params, function (err, info, next, data) {
				if(data != null) {
					var arr = data.parse.text["*"].match(/<th\sscope(.*?)>(.*?)<\/td><\/tr>/g);				
					if(arr != null) {	
						episode["name"] = episodeName;
						for(i = 0; i < arr.length; i++) {
							var tempName = arr[i].match(/<th\sscope(.*?)>(.*?)<\/th>/g)[0].match(/>(.*?)</g);
							var name = tempName[0].substring(1, tempName[0].length-1);
							var tempValue = arr[i].match(/<td\sclass=\"\"\sstyle=\"\">(.*?)<\/td>/g)[0].match(/\">(.*?)<\/td>/g);	
							var value = tempValue[0].substring(1, tempValue[0].length-1);
							newValue = [];
							if(value.indexOf("href") != -1) {
								value = value.match(/\">(.*?)<\/a>/)[0];
								value = value.substring(2, value.length-4);
							}
							else {
								value = value.substring(1, value.length-4);
							}
							/*
							* Get the other information
							*/
							
							if(value != null) {
								//console.log(value);
								name = name.toLowerCase();
								if(name == "airdate") {
									name = "airDate";
								}
								else if(name == "episode #") {
									
									var tmp = arr[i].match(/Episode\s\#(.*?)<\/tr>/g)[0].match(/>(.*?)</g);
									var seasonNumber = tmp[2].substring(1, tmp[2].length-1);
									var episodeNumber = tmp[3].substring(11, tmp[3].length-1);
									episode["nr"] = episodeNumber;
									episode["season"] = seasonNumber;
									episode["totalNr"] = parseInt(episodeNumber) + (parseInt(seasonNumber)-1) * 10;
									continue;
									
								}
								episode[name] = value;
							}
							
							/*
							*
							*/
						}
					}
					var arr = data.parse.text["*"].match(/<td>\"<a\shref(.*?)>(.*?)<\/a>\"<\/td>/g);
					console.log(arr);
					if(arr != null) {
						var predecessor = arr[0].match(/\">(.*?)<\/a>"/g)[0];
						predecessor = predecessor.substring(2, predecessor.length-4);
						var successor = arr[1].match(/\">(.*?)<\/a>"/g)[0];
						predecessor = successor.substring(2, successor.length-4);
						console.log(predecessor + "-" + successor);
					}
				}
				
				callback(episode);
			});

	},

	scrapToFile: function(cacheFile,scraperFunction,callback) {
		console.log('Scrapping from wiki. May take a while..');
		scraperFunction(function(data) {
			date = new Date();
			data = {'data': data, createdAt: new Date()};
			console.log('Writing results into cache file "'+cacheFile+'"..');
			jsonfile.writeFile(cacheFile, data, function (err) { callback(err,data); })
		});
	},
};