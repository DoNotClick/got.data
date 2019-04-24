const EpisodeStore = require('../../stores/map/episode');

class EpisodeController {
    constructor() {
        this.episodeStore = new EpisodeStore();
    }

    /**
     * @api {get} /api/map/episodes Get all episodes
     * @apiVersion 0.0.2
     * @apiName GetAllEpisodesMap
     * @apiGroup EpisodeMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[{"characters":["Viserys Targaryen","Catelyn Stark","Cersei Lannister","Jaime Lannister","Eddard Stark","Robert Baratheon","Jorah Mormont","Daenerys Targaryen","Jon Snow","Petyr Baelish","Arya Stark","Sansa Stark","Bran Stark","Robb Stark","Joffrey Baratheon","Tyrion Lannister","Jeor Mormont","Alliser Thorne","Jory Cassel","Barristan Selmy","Rodrik Cassel","Benjen Stark","Yoren","Renly Baratheon","Maester Aemon","Syrio Forel","Grenn","Irri","Pypar","Rakharo","Lancel Lannister"],"_id":"5cad97c6b0c0ef00108e5330","director":"Tim Van Patten","airDate":"2011-04-24T04:00:00.000Z","totalNr":2,"season":1,"nr":2,"name":"The Kingsroad","predecessor":"Winter Is Coming","successor":"Lord Snow","createdAt":"2019-04-10T07:14:14.456Z","updatedAt":"2019-04-10T07:14:14.456Z","__v":0}, {..}, ..]}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[]}
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Episode collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all episodes currently stored.
     */
    async getAll(req, res) {
        let result = await this.episodeStore.getAll();
        if(result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({
                'message': 'Success',
                'data': result.data
            });
        } else {
            res.status(404).send({'message': result.message});
        }
    }

    /**
     * @api {get} /api/map/episodes/:name Get episodes by name
     * @apiVersion 0.0.2
     * @apiName GetEpisodesByNameMap
     * @apiGroup EpisodeMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":{"characters":["Viserys Targaryen","Catelyn Stark","Cersei Lannister","Jaime Lannister","Eddard Stark","Robert Baratheon","Jorah Mormont","Daenerys Targaryen","Jon Snow","Petyr Baelish","Arya Stark","Sansa Stark","Bran Stark","Robb Stark","Joffrey Baratheon","Tyrion Lannister","Jeor Mormont","Alliser Thorne","Jory Cassel","Barristan Selmy","Rodrik Cassel","Benjen Stark","Yoren","Renly Baratheon","Maester Aemon","Syrio Forel","Grenn","Irri","Pypar","Rakharo","Lancel Lannister"],"_id":"5cad97c6b0c0ef00108e5330","director":"Tim Van Patten","airDate":"2011-04-24T04:00:00.000Z","totalNr":2,"season":1,"nr":2,"name":"The Kingsroad","predecessor":"Winter Is Coming","successor":"Lord Snow","createdAt":"2019-04-10T07:14:14.456Z","updatedAt":"2019-04-10T07:14:14.456Z","__v":0}}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[]}
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Episode collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return episodes named :name.
     */
    async getByName(req, res) {
        let result = await this.episodeStore.getByName(req.params.name);
        if(result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({
                'message': 'Success',
                'data': result.data
            });
        } else {
            res.status(404).send({'message': result.message});
        }
    }

    /**
     * @api {get} /api/map/episodes/byId/:id Get episodes by id
     * @apiVersion 0.0.2
     * @apiName GetEpisodesByIdMap
     * @apiGroup EpisodeMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":{"characters":["Viserys Targaryen","Catelyn Stark","Cersei Lannister","Jaime Lannister","Eddard Stark","Robert Baratheon","Jorah Mormont","Daenerys Targaryen","Jon Snow","Petyr Baelish","Arya Stark","Sansa Stark","Bran Stark","Robb Stark","Joffrey Baratheon","Tyrion Lannister","Jeor Mormont","Alliser Thorne","Jory Cassel","Barristan Selmy","Rodrik Cassel","Benjen Stark","Yoren","Renly Baratheon","Maester Aemon","Syrio Forel","Grenn","Irri","Pypar","Rakharo","Lancel Lannister"],"_id":"5cad97c6b0c0ef00108e5330","director":"Tim Van Patten","airDate":"2011-04-24T04:00:00.000Z","totalNr":2,"season":1,"nr":2,"name":"The Kingsroad","predecessor":"Winter Is Coming","successor":"Lord Snow","createdAt":"2019-04-10T07:14:14.456Z","updatedAt":"2019-04-10T07:14:14.456Z","__v":0}}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[]}
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getById(id): Episode collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return episodes with id :id.
     */
    async getById(req, res) {
        let result = await this.episodeStore.getById(req.params.id);
        if(result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({
                'message': 'Success',
                'data': result.data
            });
        } else {
            res.status(404).send({'message': result.message});
        }
    }

    /**
     * @api {get} /api/map/episodes/byCharacter/:name Get episodes by character
     * @apiVersion 0.0.2
     * @apiName GetEpisodesByCharacterMap
     * @apiGroup EpisodeMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":{"characters":["Viserys Targaryen","Catelyn Stark","Cersei Lannister","Jaime Lannister","Eddard Stark","Robert Baratheon","Jorah Mormont","Daenerys Targaryen","Jon Snow","Petyr Baelish","Arya Stark","Sansa Stark","Bran Stark","Robb Stark","Joffrey Baratheon","Tyrion Lannister","Jeor Mormont","Alliser Thorne","Jory Cassel","Barristan Selmy","Rodrik Cassel","Benjen Stark","Yoren","Renly Baratheon","Maester Aemon","Syrio Forel","Grenn","Irri","Pypar","Rakharo","Lancel Lannister"],"_id":"5cad97c6b0c0ef00108e5330","director":"Tim Van Patten","airDate":"2011-04-24T04:00:00.000Z","totalNr":2,"season":1,"nr":2,"name":"The Kingsroad","predecessor":"Winter Is Coming","successor":"Lord Snow","createdAt":"2019-04-10T07:14:14.456Z","updatedAt":"2019-04-10T07:14:14.456Z","__v":0}}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[]}
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByCharacter(name): Episode collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return episodes with character :name.
     */
    async getEpisodesByCharacter(req, res) {
        let result = await this.episodeStore.getEpisodesByCharacter(req.params.character);
        if(result.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send({
                'message': 'Success',
                'data': result.data
            });
        } else {
            res.status(404).send({'message': result.message});
        }
    }
}

module.exports = EpisodeController;