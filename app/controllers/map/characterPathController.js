const CharacterPathStore = require('../../stores/westeros/characterPath');

class CharacterPathController {
    constructor() {
        this.characterPathStore = new CharacterPathStore();
    }

    /**
     * @api {get} /api/map/characterpaths Get all characters paths
     * @apiVersion 0.0.2
     * @apiName GetAllCharacterPathssMap
     * @apiGroup CharacterPathsMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":[{"path":[{"from":1,"to":2,"path":[[78.60937753613514,-105.31330572428169,"Winterfell"],[78.87133549569842,-104.35496490808343,"Holdfast"],[78.60937753613514,-105.31330572428169,"Winterfell"]],"alive":true}, {..}, ..]}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Character collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return character paths currently stored.
     */
    async getAll(req, res) {
        let result = await this.characterPathStore.getAll();
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
     * @api {get} /api/map/characterpaths/:name Get characters by name
     * @apiVersion 0.0.2
     * @apiName GetCharacterPathsByNameMap
     * @apiGroup CharacterPathsMap
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"Success","data":{"path":[{"from":1,"to":2,"path":[[78.60937753613514,-105.31330572428169,"Winterfell"],[78.87133549569842,-104.35496490808343,"Holdfast"],[78.60937753613514,-105.31330572428169,"Winterfell"]],"alive":true},{"from":2,"to":20,"path":[[78.60937753613514,-105.31330572428169,"Winterfell"]],"alive":true},{"from":20,"to":21,"path":[[78.43946295335057,-106.31626680324167],[78.60937753613514,-105.31330572428169,"Winterfell"],[78.84764249949863,-106.28112911454507],[79.06970734054885,-106.80819444499399]],"alive":true},{"from":21,"to":22,"path":[[78.84764249949863,-106.28112911454507],[79.06970734054885,-106.80819444499399]],"alive":true},{"from":22,"to":23,"path":[[79.35252162086704,-107.51094821892588],[79.35252162086704,-107.47581053022927]],"alive":true},{"from":23,"to":24,"path":[[80.30136739458031,-105.40268689713021]],"alive":true},{"from":24,"to":25,"path":[[80.28359278019386,-105.4378245858268]],"alive":true},{"from":25,"to":27,"path":[[80.30136739458031,-105.36754920843362]],"alive":true},{"from":27,"to":28,"path":[[81.2629953707073,-98.44542453520452],[81.77584775250654,-96.26688783601567],[82.45044691161227,-94.05321344813024]],"alive":true},{"from":28,"to":29,"path":[[82.41342482573937,-93.98293807073706]],"alive":true},{"from":29,"to":30,"path":[[82.95722904088991,-93.55765837891627,"Queenscrown"]],"alive":true},{"from":30,"to":32,"path":[[83.50917855591369,-95.52899637338719,"Nightfort"]],"alive":true},{"from":32,"to":33,"path":[[83.9577310102979,-97.3912938743067],[83.99092783099715,-97.77780844996923]],"alive":true},{"from":33,"to":34,"path":[[83.9946051312424,-97.77780844996923]],"alive":true},{"from":34,"to":35,"path":[[84.05970780277003,-99.05214572511969,"Craster's Keep"]],"alive":true},{"from":35,"to":40,"path":[[84.05970780277003,-99.05214572511969,"Craster's Keep"]],"alive":true},{"from":40,"to":41,"path":[[84.91905941921368,-106.63250600151099],[84.95008354139446,-106.70278137890419]],"alive":true},{"from":41,"path":[[84.95008354139446,-106.70278137890419]],"alive":true}],"_id":"5cad97c6b0c0ef00108e57a9","name":"Bran Stark","__v":0}}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     {"message":"No characters matched your criteria"}
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Character collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return character paths named :name.
     */
    async getByName(req, res) {
        let result = await this.characterPathStore.getByName(req.params.name);
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

module.exports = CharacterPathController;