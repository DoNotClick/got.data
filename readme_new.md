# GOT.DATA API

This document contains all current API routes to our GoT database. It consists of two different data sets:

-   data scraped from the [tv show wiki page](https://gameofthrones.fandom.com/wiki/Game_of_Thrones_Wiki)
-   data scraped from the [books wiki page](https://awoiaf.westeros.org/index.php/Main_Page)

Please use the API routes as described below.

----------

# Show API Routes
The following table shows all possible API routes. Please use 
### https://gotdata.northeurope.cloudapp.azure.com
as base url followed by the paths described below. 

|Model|Main Path|API endpoint|type*|description
|--|--|--|--|--|
|Animal|/api/show/animals||GET| returns all animals
|||/:name|GET|returns animal by name
|||/byHabitat/:location|GET|returns animal by habitat/location
|||||
|Assassin|/api/show/assassins||GET| returns all assassins
|||/:name|GET|returns assassin by name
|||||
|Bastard|/api/show/bastards||GET| returns all bastards
|||/:name|GET|returns bastard by name
|||||
|Battle|/api/show/battles||GET| returns all battles
|||/:name|GET|returns battle by name
|||/bySlug/:slug|GET|returns battle by page name
|||/byLocation/:location|GET|returns battle by location
|||/byConflict/:conflict|GET|returns battle by conflict
|||||
|City|/api/show/cities||GET| returns all cities
|||/:name|GET|returns city by name
|||/byLocation/:location|GET|returns city by location
|||||
|Character|/api/show/characters||GET|returns all characters
|||/:name|GET|returns character by name
|||/bySlug/:slug|GET|returns character by page title
|||/byHouse/:house|GET|returns character by house
|||||
|Castle|/api/show/castles||GET| returns all castles
|||/:name|GET|returns castle by name
|||/byLocation/:location|GET|returns castles by location
|||||
|Episode|/api/show/episodes||GET| returns all episodes
|||/:title|GET|returns episode by title
|||||
|Region|/api/show/regions||GET| returns all cities
|||/:name|GET|returns city by name
|||/byLocation/:location|GET|returns city by location
|||||
|Religion|/api/show/religions||GET| returns all religions
|||/:title|GET|returns religion by title
|||||
|Town|/api/show/towns||GET| returns all towns
|||/:name|GET|returns town by name
|||/byLocation/:location|GET|returns town by location
|||/byRuler/:name|GET|returns town by ruler
|||/byReligion/:religion|GET|returns town by religion

*\* POST requests will be added soon*

Examples:
```javascript
    https://gotdata.northeurope.cloudapp.azure.com/api/show/characters/Jon_Snow
    https://gotdata.northeurope.cloudapp.azure.com/api/show/towns
```

Possible error messages:
> "No XYZ matched your criteria"
> "XYZ collection empty. Scraping should be started anytime soon...."
----------

# Data Models

A short overview of the different data models:

## AnimalModel

```javascript
	name 	: {type: String, required: true, unique: true},
	type 	: {type: String},
	diet 	: {type: String},
	status 	: {type: String},
	habitat : [{type: String}],
	range 	: [{type: String}]
```

## AssassinModel

```javascript
	name : {type: String, required: true, ref: 'CharacterFandom'}
```

## BastardModel

```javascript
	name : {type: String, required: true, ref: 'CharacterFandom'}
```

## BattleModel

```javascript
	name 			: {type: String, required: true, unique: true},
	slug 			: {type: String},
	conflict 		: {type: String},
	dateOfBattle 	: {type: Number},
	location 		: [{type: String, ref: 'Region'}],
	factionsOne 	: [{type: String, ref: 'House'}],
	factionsTwo 	: [{type: String, ref: 'House'}],
	commandersOne 	: [{type: String, ref: 'CharacterFandom'}],
	commandersTwo 	: [{type: String, ref: 'CharacterFandom'}],
	forcesOne 		: [{type: String}],
	forcesTwo 		: [{type: String}],
	casualties 		: [{type: String, ref: 'CharacterFandom'}],
	createdAt 		: {type: Date, default: Date.now},
	updatedAt 		: {type: Date, default: Date.now}
```

## CharacterModel

```javascript
    name            : {type: String, required: true, unique: true},
    slug            : {type: String, required: true},
    nicknames       : [String],                               
    titles          : [String],                                                        
    gender          : String,
    image           : String,                                                       
    alive           : Boolean,
    birth           : Number,
    death           : Number,
    origin          : String,
    mother          : {type: String, ref: 'CharacterFandom'},
    father          : {type: String, ref: 'CharacterFandom'},
    siblings        : [{type: String, ref: 'CharacterFandom'}],
    house           : {type: String, ref: 'House'},
    spouse          : {type: String, ref: 'CharacterFandom'},
    lovers          : [{type: String, ref: 'CharacterFandom'}],

    cultures        : [{type: String, ref: 'Culture'}],
    religions       : [{type: String, ref: 'ReligionFandom'}],
    allegiances     : [{type: String, ref: 'CharacterFandom'}],

    first_seen      : {type: String, ref: 'EpisodeFandom'},
    seasons         : [Number],
    appearances     : [{type: String, ref: 'EpisodeFandom'}],

    actor           : String,
    createdAt       : {type: Date, default: Date.now},
    updatedAt       : {type: Date, default: Date.now},

```
## CastleModel

```javascript
	name 		: {type: String, required: true, unique: true},
	location 	: {type: String, ref: "RegionFandom"},
	type 		: {type: String},
	religion 	: [{type: String, ref: "ReligionsFandom"}],
	rulers 		: [{type: String, ref: "House"}],
	age 		: {type: Number},
	founder 	: [{type: String}]
```

## CityModel

```javascript
	name 			: {type: String, required: true, unique: true},
	location 		: {type: String, ref: "Continent"},
	type 			: {type: String},
	rulers 			: [{type: String}],
	religion 		: [{type: String, ref: "ReligionsFandom"}],
	founder 		: [{type: String, ref: "CharacterFandom"}],
	placesOfNote 	: [{type: String}]
```

## Episode Model

```javascript
    title           : {type: String, required: true, unique: true},
    number          : Number,
    season          : Number,
    episode         : Number,
    image           : String,
    date            : Date,
    viewers         : Number,

    runtime         : Number,
    written_by      : String,
    directed_by     : String,
    preview_text    : String,

    characters      : [{type: String, ref: 'CharacterFandom'}],
    deaths          : [{type: String, ref: 'CharacterFandom'}],
    places          : [{type: String, ref: 'City'}],
    
    predecessor     : {type: String, ref: 'EpisodeFandom'},
    successor       : {type: String, ref: 'EpisodeFandom'},
    
    createdAt		: {type: Date, default: Date.now},
    updatedAt		: {type: Date, default: Date.now}
```

## RegionModel

```javascript
	name 			: {type: String, required: true, unique: true},
	location 		: {type: String, ref: "Continent"},
	geography 		: {type: String},
	rulers 			: [{type: String, ref: "CharacterFandom"}],
	religion 		: [{type: String, ref: "ReligionsFandom"}],
	culture 		: [{type: String, ref: "Culture"}],
	regionCapital 	: {type: String},
	cities 			: [{type: String}],
	towns 			: [{type: String}],
	castles 		: [{type: String, ref: "CastleFandom"}],
	founder 		: [{type: String, ref: "CharacterFandom"}],
	placesOfNote 	: [{type: String}]
```

## Religion Model

```javascript
    name        : {type: String, required: true, unique: true},
    slug        : String,
    image       : String,

    type        : [String],
    clergy      : {type: String, ref: "CharacterFandom"},
    locations   : [{type: String, ref: "RegionFandom"}],
    leaders     : [{type: String, ref: "CharacterFandom"}],
    center      : String,

    neighbors   : [{type: String, ref: "RegionFandom"}],
    cultures    : [{type: String, ref: "Culture"}],
    events      : [{type: String, ref: "Event"}]
```

## PageRank Model

```javascript
    title       : {type: String, required: true, unique: true},
    rank        : Number
```

## TownModel

```javascript
	name 		: {type: String, required: true, unique: true},
	location 	: {type: String, ref: "Continent"},
	type 		: {type: String},
	rulers 		: [{type: String}],
	religion 	: [{type: String, ref: "ReligionsFandom"}]
```



# Questions & Feedback

Please feel free to ask us (Team A) anything on Slack! We are happy to help!  
Bear in mind that this API is not finished yet. Some attribute names may change and more data models will follow! Stay tuned.
