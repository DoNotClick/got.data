# GOT.DATA 

In this project we will lay the foundations for our system by integrating data from multiple sources into a central database. The database will serve the apps and the visualization tool that will be developed in other projects.

# Links
  - Main page: https://www.got.show
  - API accessable at: https://api.got.show/api/
  - Documentation about API endpoints: https://api.got.show/doc/
  - Main wiki entry: https://github.com/got-show/got.data

# Developer information

## Docker Setup
* Install Docker and Docker-Compose on your local machine
* Clone this project to a folder on your hard drive, open a console and change into the folder you just checked out
* Rename `docker-compose.yml.template` to `docker-compose.yml` and adjust ports, access token, collection name as you want
* Build and start the containers with `docker-compose up -d`
* Done

## Standard Setup NodeJS & MongoDB
* Install nodejs and mongodb on your local machine (https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/ and https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
* Clone this project to a folder on your hard drive, open a console and change into the folder you just checked out
* Run `sudo npm install` to install any sub-modules required
* Install apidoc globally: `sudo npm install apidoc -g`
* Generate the documentation: `apidoc -i app/ -o misc/apidoc/`
* Copy the config file in `cfg` to `config.js` and edit it
	* You can leave username and password empty on default configurations 
	* Use 127.0.0.1 and port 27017 for default configurations
* Start local MongoDB server with `mongod`
	* You can specifc the port and folder you want to use: `mongod --dbpath /your/db/path/here --port 27017`
* Run `nodejs app.js` to start the server
* Node should start to update all collections during first startup
* If needed, you can start MongoDB shell via `mongo`. Then type `show dbs` to see all databases. Type `use db_name_here` to switch to preferred database. With `show collections` you can see all tables (in NoSQL tables are called collections). With `db.collection_name.find()` you can output the collection content.

## Scraping and filling / updating the database

If the collections are empty, the fillers will be started automatically on startup.

`x` is in the following a placeholder and has to be replaced by the intended collection. (e.g. character)

`y` is in the following a placeholder and has to be replaced by the intended wiki. (e.g. fandom, map, westeros)

* To delete the collection and fill it again (new _ids are set!) with newly scraped data use: `npm run refill --collection=x --wiki=y`
* To update the collection with newly scraped data (manual edits are overwritten!) use: `npm run update --collection=x --wiki=y`
* To only add new properties/entries to the collection from a newly scrap use: `npm run safeupdate --collection=x --wiki=y`

Westeros Wiki (`y = westeros`):
*    `x = 'age'`, \[refill\]
*    `x = 'character'`, \[refill | update | safeupdate\]
*    `x = 'characterImage'`, \[refill | update\] (requires character collection to be filled)
*    `x = 'characterLocation'`, \[refill\]
*    `x = 'characterPath'`, \[refill\] (uses 'data/characterPaths.json')
*    `x = 'city'`, \[refill\] (uses 'data/cities.json')
*    `x = 'continent'`, \[refill\] (uses 'data/continents.json')
*    `x = 'culture'`, \[refill\]
*    `x = 'event'`, \[refill\]
*    `x = 'house'`, \[refill\]
*    `x = 'pagerank'`, \[refill\]
*    `x = 'region'`, (uses 'data/regions.json') \[refill\]

Fandom Wiki (`y = fandom`):
*    `x = 'age'`, \[refill\]
*    `x = 'animal'`, \[refill\]
*    `x = 'assassin'`, \[refill\]
*    `x = 'bastard'`, \[refill\]
*    `x = 'battle'`, \[refill\]
*    `x = 'castle`', \[refill\]
*    `x = 'character`', \[refill | update | safeupdate\]
*    `x = 'characterImage`', \[refill | update\] (requires character collection to be filled)
*    `x = 'characterLocation`', \[refill\]
*    `x = 'city'`,  \[refill\]
*    `x = 'episode'`, \[refill\]
*    `x = 'event'`, \[refill\]
*    `x = 'house'`, \[refill\]
*    `x = 'pagerank'`, \[refill\]
*    `x = 'region'`, \[refill\]
*    `x = 'religion'`, \[refill\]
*    `x = 'town'`, \[refill\]

Map Endpoints (`y = map`):
*    `x = 'character'`, \[refill\] (uses 'data/characters.json')
*    `x = 'episode'`, \[refill\] (uses 'data/episodes.json')
*    `x = 'region'`, \[refill\] (uses 'data/regions.json')
