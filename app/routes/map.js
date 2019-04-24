const CharacterController = require('../controllers/map/characterController');
const CharacterLocationController = require('../controllers/map/characterLocationController');
const CharacterPathController = require('../controllers/map/characterPathController');
const CityController = require('../controllers/map/cityController');
const EpisodeController = require('../controllers/map/episodeController');
const RegionController = require('../controllers/map/regionController');

module.exports = function (app, router) {
    const characterController = new CharacterController();
    router.get('/characters', characterController.getAll.bind(characterController));
    router.get('/characters/:name', characterController.getByName.bind(characterController));
    router.get('/characters/bySlug/:slug', characterController.getBySlug.bind(characterController));
    router.get('/characters/byId/:id', characterController.getById.bind(characterController));

    const characterLocations = new CharacterLocationController();
    router.get('/characterlocations', characterLocations.getAll.bind(characterLocations));
    router.get('/characterlocations/:name', characterLocations.getByName.bind(characterLocations));
    router.get('/characterlocations/byLocation/:location', characterLocations.getByLocation.bind(characterLocations));
    router.get('/characterlocations/bySlug/:slug', characterLocations.getBySlug.bind(characterLocations));

    const characterPaths = new CharacterPathController();
    router.get('/characterpaths', characterPaths.getAll.bind(characterPaths));
    router.get('/characterpaths/:name', characterPaths.getByName.bind(characterPaths));

    const cityController = new CityController();
    router.get('/cities', cityController.getAll.bind(cityController));
    router.get('/cities/:name', cityController.getByName.bind(cityController));
    router.get('/cities/byId/:id', cityController.getById.bind(cityController));

    const episodeController = new EpisodeController();
    router.get('/episodes', episodeController.getAll.bind(episodeController));
    router.get('/episodes/:name', episodeController.getByName.bind(episodeController));
    router.get('/episodes/byId/:id', episodeController.getById.bind(episodeController));
    router.get('/episodes/byCharacter/:name', episodeController.getEpisodesByCharacter.bind(episodeController));

    const regionController = new RegionController();
    router.get('/regions', regionController.getAll.bind(regionController));
    router.get('/regions/:name', regionController.getByName.bind(regionController));
    router.get('/regions/byId/:id', regionController.getById.bind(regionController));
};