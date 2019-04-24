const CharacterController = require('../controllers/general/characterController');

module.exports = function (app, router) {
    const characterController = new CharacterController();
    router.get('/characters', characterController.getAll.bind(characterController));
    router.get('/characters/:name', characterController.getByName.bind(characterController));
    router.get('/characters/bySlug/:slug', characterController.getBySlug.bind(characterController));
    router.get('/characters/byHouse/:house', characterController.getByHouse.bind(characterController));
};