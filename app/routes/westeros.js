const CharacterController = require('../controllers/westerosController/characterController');
const AgeController = require('../controllers/westerosController/ageController');
const HouseController = require('../controllers/westerosController/houseController');
const CharacterLocationController = require('../controllers/westerosController/characterLocations');
const CharacterPathController = require('../controllers/westerosController/characterPaths');
const CityController = require('../controllers/westerosController/cityController');
const CultureController = require('../controllers/westerosController/cultureController');
const RegionController = require('../controllers/westerosController/regionController');
const ContinentController = require('../controllers/westerosController/continentController');
const EventController = require('../controllers/westerosController/eventController');
const PageRankController = require('../controllers/westerosController/pagerankController');
const BayeseanAttributeController = require('../controllers/westerosController/bayeseanController');

module.exports = function(app, router) {

    const ageController = new AgeController();
    router.get('/ages', ageController.getAll.bind(ageController));
    router.get('/ages/:name', ageController.getByName.bind(ageController));

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

    const characterLocationController = new CharacterLocationController();
    router.get('/characterLocations', characterLocationController.getAll.bind(characterLocationController));
    router.get('/characterLocations/:name', characterLocationController.getByName.bind(characterLocationController));
    router.get('/characterLocations/bySlug/:slug', characterLocationController.getBySlug.bind(characterLocationController));

    const characterPathController = new CharacterPathController();
    router.get('/characterPaths', characterPathController.getAll.bind(characterPathController));
    router.get('/characterPaths/:name', characterPathController.getByName.bind(characterPathController));

    const cityController = new CityController();
    router.get('/cities', cityController.getAll.bind(cityController));
    router.get('/cities/:name', cityController.getByName.bind(cityController));
    router.get('/cities/byContinent/:continent', cityController.getByContinent.bind(cityController));

    const regionController = new RegionController();
    router.get('/regions', regionController.getAll.bind(regionController));
    router.get('/regions/:name', regionController.getByName.bind(regionController));
    router.get('/regions/byContinent/:continent', regionController.getByContinent.bind(regionController));

    const cultureController = new CultureController();
    router.get('/cultures', cultureController.getAll.bind(cultureController));
    router.get('/cultures/:name', cultureController.getByName.bind(cultureController));

    const continentController = new ContinentController();
    router.get('/continents', continentController.getAll.bind(continentController));
    router.get('/continents/:name', continentController.getByName.bind(continentController));

    const eventController = new EventController();
    router.get('/events', eventController.getAll.bind(eventController));
    router.get('/events/:name', eventController.getAll.bind(eventController));

    const rankController = new PageRankController();
    router.get('/ranks', rankController.getAll.bind(rankController));
    router.get('/ranks/:slug', rankController.getBySlug.bind(rankController));

    const bayeseanController = new BayeseanAttributeController();
    router.get("/bayesean-attributes", bayeseanController.getAll.bind(bayeseanController));
    router.post("/bayesean-attributes/update", bayeseanController.update.bind(bayeseanController));
};