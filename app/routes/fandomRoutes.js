const   CharacterController = require('../controllers/fandomController/characterController'),
        AgeController = require('../controllers/fandomController/ageController'),
        HouseController = require('../controllers/fandomController/houseController'),
        ReligionController = require('../controllers/fandomController/religionController'),
        EpisodeController = require('../controllers/fandomController/episodeController'),
        PageRankController = require('../controllers/fandomController/pagerankController'),
        AnimalController = require('../controllers/fandomController/animalController'),
        AssassinController = require('../controllers/fandomController/assassinController'),
        BastardController = require('../controllers/fandomController/bastardController'),
        BattleController = require ('../controllers/fandomController/battleController'),
        CastleController = require('../controllers/fandomController/castleController'),
        CityController = require('../controllers/fandomController/cityController'),
        RegionController = require('../controllers/fandomController/regionController'),
        TownController = require('../controllers/fandomController/townController'),
        EventController = require('../controllers/fandomController/eventController');


module.exports = function(app, router) {

    const ageController = new AgeController();
    router.get('/ages', ageController.getAll.bind(ageController));
    router.get('/ages/:name', ageController.getByName.bind(ageController));
    router.get('/ages/byAge/:age', ageController.getByAge.bind(ageController));

    const houseController = new HouseController();
    router.get('/houses', houseController.getAll.bind(houseController));
    router.get('/houses/:name', houseController.getByName.bind(houseController));

    const charController = new CharacterController();
    router.get('/characters', charController.getAll.bind(charController));
    router.get('/characters/:name', charController.getByName.bind(charController));
    router.get('/characters/bySlug/:slug', charController.getBySlug.bind(charController));
    router.get('/characters/byHouse/:house', charController.getByHouse.bind(charController));
    router.post('/characters/updateGeneral', charController.updateGeneral.bind(charController));
    router.post('/characters/updateGroupB', charController.updateGroupB.bind(charController));
    router.post('/characters/updateGroupC', charController.updateGroupC.bind(charController));

    const eventController = new EventController();
    router.get('/events', eventController.getAll.bind(eventController));
    router.get('/events/:name', eventController.getByName.bind(eventController));
    router.get('/events/bySlug/:slug', eventController.getBySlug.bind(eventController));
    router.get('/events/byConflict/:conflict', eventController.getByConflict.bind(eventController));
    router.get('/events/byDate/:date', eventController.getByDate.bind(eventController));

    const episodeController = new EpisodeController();
    router.get('/episodes', episodeController.getAll.bind(episodeController));
    router.get('/episodes/:title', episodeController.getByTitle.bind(episodeController));

    const religionController = new ReligionController();
    router.get('/religions', religionController.getAll.bind(religionController));
    router.get('/religions/:title', religionController.getByTitle.bind(religionController));

    const rankController = new PageRankController();
    router.get('/ranks', rankController.getAll.bind(rankController));
    router.get('/ranks/:slug', rankController.getBySlug.bind(rankController));

    const animalController = new AnimalController();
    router.get('/animals', animalController.getAll.bind(animalController));
    router.get('/animals/:name', animalController.getByName.bind(animalController));
    router.get('/animals/byHabitat/:habitat', animalController.getByHabitat.bind(animalController));

    const assassinController = new AssassinController();
    router.get('/assassins', assassinController.getAll.bind(assassinController));
    router.get('/assassins/:name', assassinController.getByName.bind(assassinController));

    const bastardController = new BastardController();
    router.get('/bastards', bastardController.getAll.bind(bastardController));
    router.get('/bastards/:name', bastardController.getByName.bind(bastardController));
    
    const battleController = new BattleController();
    router.get('/battles', battleController.getAll.bind(battleController));
    router.get('/battles/:name', battleController.getByName.bind(battleController));
    router.get('/battles/bySlug/:name', battleController.getBySlug.bind(battleController));
    router.get('/battles/byLocation/:location', battleController.getByLocation.bind(battleController));
    router.get('/battles/byConflict/:conflict', battleController.getByConflict.bind(battleController));

    const castleController = new CastleController();
    router.get('/castles', castleController.getAll.bind(castleController));
    router.get('/castles/:name', castleController.getByName.bind(castleController));
    router.get('/castles/byLocation/:location', castleController.getByLocation.bind(castleController));

    const cityController = new CityController();
    router.get('/cities', cityController.getAll.bind(cityController));
    router.get('/cities/:name', cityController.getByName.bind(cityController));
    router.get('/cities/byLocation/:location', cityController.getByLocation.bind(cityController));
    
    const regionController = new RegionController();
    router.get('/regions', regionController.getAll.bind(regionController));
    router.get('/regions/:name', regionController.getByName.bind(regionController));
    router.get('/regions/byLocation/:location', regionController.getByLocation.bind(regionController));

    const townController = new TownController();
    router.get('/towns', townController.getAll.bind(townController));
    router.get('/towns/:name', townController.getByName.bind(townController));
    router.get('/towns/byLocation/:location', townController.getByLocation.bind(townController));
    router.get('/towns/byRuler/:name', townController.getByRuler.bind(townController));
    router.get('/towns/byReligion/:name', townController.getByReligion.bind(townController));

}


