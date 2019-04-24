const CharacterPathStore = require('../../stores/westeros/characterPath');

class CharacterPathController {
    constructor() {
        this.characterPathStore = new CharacterPathStore();
    }

    /**
     * @api {get} /api/book/characterpaths Get all characters paths
     * @apiVersion 0.0.2
     * @apiName GetAllCharacterPathssBook
     * @apiGroup CharacterPathsBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"path":[{"from":1,"to":2,"path":[[78.60937753613514,-105.31330572428169,"Winterfell"],[78.87133549569842,-104.35496490808343,"Holdfast"],[78.60937753613514,-105.31330572428169,"Winterfell"]],"alive":true},{"from":2,"to":3,"path":[[78.60937753613514,-105.31330572428169,"Winterfell"],[78.26209183448897,-104.06745472665963],[77.95071659611816,-103.18901250924476],[77.8401938026893,-103.96204166056982],[77.61614450621268,-104.10259241535623],[77.33421454748652,-104.80534618928812],[77.15578831849741,-104.77020850059152],[76.82356825529133,-105.54323765191658],[76.6543068480568,-105.57837534061318],[76.45002022211,-105.15672307625407],[76.17565758388399,-105.12158538755747],[75.98973039777916,-104.66479543450174],[75.47011578713258,-104.77020850059152],[75.10424752136025,-104.45396930232216],[74.61793103539632,-104.59452005710853],[74.23112669048314,-104.06745472665963],[73.56860837779969,-104.2431431701426],[72.91005902137822,-103.78635321708686],[72.91005902137822,-103.78635321708686],[72.1927801389041,-103.84384980611101,"Moat Cailin"],[70.83513183737605,-102.62680949009926],[69.81802574321294,-103.22415019794136],[68.90161179894676,-103.11873713185159],[68.3509875123563,-102.69708486749245],[67.94556681496306,-102.66194717879586],[67.53293930348681,-102.13488184834694],[67.53293930348681,-102.13488184834694],[66.61600701721079,-102.69708486749245],[66.02331319427977,-103.32956326403115],[64.9445378388721,-103.61066477360389],[64.02130178357928,-103.47011401881751],[63.38307301517862,-102.83763562227882],[62.77859389212154,-102.3457079805265],[61.914324904703044,-100.62396123439338],[61.14384356859284,-99.71038132828193],[60.544714536456816,-98.26973609172157],[59.5625391561233,-96.79395316646459]],"alive":true},{"from":3,"to":4,"path":[[60.544714536456816,-98.26973609172157],[59.5625391561233,-96.79395316646459],[58.64171437619993,-94.77155674610076,"Crossroads Inn"],[57.95927171801536,-93.91266269334386],[56.974227069508494,-93.30210082793006,"Darry"],[56.08541762346779,-93.24504660810857],[55.11272602316825,-92.85853203244604],[54.115761925794686,-92.40174207939029],[53.367658252516286,-92.12064056981752],[52.627516553003176,-92.12064056981752],[51.98297832147753,-91.69898830545841],[51.43867715836525,-90.78540839934695],[50.86563995634066,-89.80155311584232],[50.449300964910904,-89.468737563137,"Ivy Inn"],[49.720865815714234,-88.95824858712405],[48.751826833236564,-88.06317103271289,"Brindlewood"],[48.2685522445431,-87.58787872795688],[47.798629017284384,-86.92026264272158],[47.29916873132517,-86.52982572679565,"Hayford"],[46.72561004602613,-86.35805962357607],[46.70151802939272,-85.44447971746462],[46.36310024474359,-84.81200132092593],[45.805474068515245,-84.48536531890602,"King's Landing"]],"alive":true},{"from":4,"to":9,"path":[[45.805474068515245,-84.48536531890602,"King's Landing"]],"alive":true},{"from":9,"path":[[45.805474068515245,-84.48536531890602,"King's Landing"]],"alive":false}],"_id":"5cad97c6b0c0ef00108e57a4","name":"Eddard Stark","__v":0}, {..}, ..]
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Character collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return character paths currently stored.
     */
    async getAll(req, res) {
        let characters = await this.characterPathStore.getAll();
        if(characters.success === STORE_RESPONSE_SUCCESS) {
            return res.status(200).send(characters.data);
        } else {
            return res.status(404).send(characters.message);
        }
    }

    /**
     * @api {get} /api/book/characterpaths/:name Get characters paths by name
     * @apiVersion 0.0.2
     * @apiName GetAllCharacterPathssBook
     * @apiGroup CharacterPathsBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"path":[{"from":1,"to":2,"path":[[78.60937753613514,-105.31330572428169,"Winterfell"],[78.87133549569842,-104.35496490808343,"Holdfast"],[78.60937753613514,-105.31330572428169,"Winterfell"]],"alive":true},{"from":2,"to":20,"path":[[78.60937753613514,-105.31330572428169,"Winterfell"]],"alive":true},{"from":20,"to":21,"path":[[78.43946295335057,-106.31626680324167],[78.60937753613514,-105.31330572428169,"Winterfell"],[78.84764249949863,-106.28112911454507],[79.06970734054885,-106.80819444499399]],"alive":true},{"from":21,"to":22,"path":[[78.84764249949863,-106.28112911454507],[79.06970734054885,-106.80819444499399]],"alive":true},{"from":22,"to":23,"path":[[79.35252162086704,-107.51094821892588],[79.35252162086704,-107.47581053022927]],"alive":true},{"from":23,"to":24,"path":[[80.30136739458031,-105.40268689713021]],"alive":true},{"from":24,"to":25,"path":[[80.28359278019386,-105.4378245858268]],"alive":true},{"from":25,"to":27,"path":[[80.30136739458031,-105.36754920843362]],"alive":true},{"from":27,"to":28,"path":[[81.2629953707073,-98.44542453520452],[81.77584775250654,-96.26688783601567],[82.45044691161227,-94.05321344813024]],"alive":true},{"from":28,"to":29,"path":[[82.41342482573937,-93.98293807073706]],"alive":true},{"from":29,"to":30,"path":[[82.95722904088991,-93.55765837891627,"Queenscrown"]],"alive":true},{"from":30,"to":32,"path":[[83.50917855591369,-95.52899637338719,"Nightfort"]],"alive":true},{"from":32,"to":33,"path":[[83.9577310102979,-97.3912938743067],[83.99092783099715,-97.77780844996923]],"alive":true},{"from":33,"to":34,"path":[[83.9946051312424,-97.77780844996923]],"alive":true},{"from":34,"to":35,"path":[[84.05970780277003,-99.05214572511969,"Craster's Keep"]],"alive":true},{"from":35,"to":40,"path":[[84.05970780277003,-99.05214572511969,"Craster's Keep"]],"alive":true},{"from":40,"to":41,"path":[[84.91905941921368,-106.63250600151099],[84.95008354139446,-106.70278137890419]],"alive":true},{"from":41,"path":[[84.95008354139446,-106.70278137890419]],"alive":true}],"_id":"5cad97c6b0c0ef00108e57a9","name":"Bran Stark","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     No characters matched your criteria
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Character collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return character paths named :name.
     */
    async getByName(req, res) {
        let characters = await this.characterPathStore.getByName(req.params.name);
        if(characters.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(characters.data);
        } else {
            res.status(404).send(characters.message);
        }
    }
}

module.exports = CharacterPathController;