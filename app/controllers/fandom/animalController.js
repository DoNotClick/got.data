const AnimalStore = require('../../stores/fandom/animal');

class AnimalController {
    constructor() {
        this.animalStore = new AnimalStore();
    }

    /**
     * @api {get} /api/show/animals/ Get all animals
     * @apiVersion 0.0.2
     * @apiName GetAllAnimalsShow
     * @apiGroup AnimalShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"habitat":[],"range":[],"_id":"5cad97e1b0c0ef00108e5db7","name":"Animals and Plants","diet":"","status":"","__v":0},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Animal collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all the animals currently stored.
     */
    async getAll(req, res) {
        let animals = await this.animalStore.getAll();
        if(animals.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(animals.data);
        } else {
            res.status(404).send(animals.message);
        }
    }

    /**
     * @api {get} /api/show/animals/:name Get animals by name
     * @apiVersion 0.0.2
     * @apiName GetAllAnimalsByNameShow
     * @apiGroup AnimalShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"habitat":[],"range":[],"_id":"5cad97e1b0c0ef00108e5db7","name":"Animals and Plants","diet":"","status":"","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return the animals named :name.
     */
    async getByName(req, res) {
        let animals = await this.animalStore.getByName(req.params.name);
        if(animals.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(animals.data);
        } else {
            res.status(404).send(animals.message);
        }
    }


    /**
     * @api {get} /api/show/animals/byHabitat/:habitat Get animals by habitat
     * @apiVersion 0.0.2
     * @apiName GetAllAnimalsByHabitatShow
     * @apiGroup AnimalShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"habitat":[],"range":[],"_id":"5cad97e1b0c0ef00108e5db7","name":"Animals and Plants","diet":"","status":"","__v":0}, {..}, .. }]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByHabitat(data): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return the animals living in a specific habitat named :habitat.
     */
    async getByHabitat(req, res) {
        let animals = await this.animalStore.getByHabitat(req.params.habitat);
        if(animals.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(animals.data);
        } else {
            res.status(404).send(animals.message);
        }
    }
}

module.exports = AnimalController;