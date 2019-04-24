const BattleStore = require('../../stores/fandom/battle');

class BattleController {
    constructor() {
        this.battleStore = new BattleStore();
    }

    /**
     * @api {get} /api/show/battles Get all battles
     * @apiVersion 0.0.2
     * @apiName GetAllBattlesShow
     * @apiGroup BattleShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"place":["Dragonstone"],"factionsOne":["Greens"],"factionsTwo":["Blacks"],"commandersOne":["King Aegon II","Targaryen"],"commandersTwo":["Queen Rhaenyra I Targaryen"],"forcesOne":["Dragonstone Garrison","Aegon's Kingsguard","Sunfyre"],"forcesTwo":["Rhaenyra's","Queensguard"],"casualties":["None","All of Rhaenyra's Queensguard","Queen Rhaenyra I","Prince Aegon","Targaryen "],"_id":"5cad980fb0c0ef00108e5ff8","name":"Ambush at Dragonstone","slug":"Ambush_at_Dragonstone","conflict":"Dance of the Dragons","dateOfBattle":null,"createdAt":"2019-04-10T07:15:27.777Z","updatedAt":"2019-04-10T07:15:27.777Z","__v":0},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Battle collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all battles currently stored.
     */
    async getAll(req, res) {
        let battles = await this.battleStore.getAll();
        if(battles.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(battles.data);
        } else {
            res.status(404).send(battles.message);
        }
    }

    /**
     * @api {get} /api/show/battles/:name Get battles by name
     * @apiVersion 0.0.2
     * @apiName GetBattlesByNameShow
     * @apiGroup BattleShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"place":["Dragonstone"],"factionsOne":["Greens"],"factionsTwo":["Blacks"],"commandersOne":["King Aegon II","Targaryen"],"commandersTwo":["Queen Rhaenyra I Targaryen"],"forcesOne":["Dragonstone Garrison","Aegon's Kingsguard","Sunfyre"],"forcesTwo":["Rhaenyra's","Queensguard"],"casualties":["None","All of Rhaenyra's Queensguard","Queen Rhaenyra I","Prince Aegon","Targaryen "],"_id":"5cad980fb0c0ef00108e5ff8","name":"Ambush at Dragonstone","slug":"Ambush_at_Dragonstone","conflict":"Dance of the Dragons","dateOfBattle":null,"createdAt":"2019-04-10T07:15:27.777Z","updatedAt":"2019-04-10T07:15:27.777Z","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all battles named :name.
     */
    async getByName(req, res) {
        let battles = await this.battleStore.getByName(req.params.name);
        if(battles.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(battles.data);
        } else {
            res.status(404).send(battles.message);
        }
    }

    /**
     * @api {get} /api/show/battles/bySlug/:slug Get battles by slug
     * @apiVersion 0.0.2
     * @apiName GetBattlesBySlugShow
     * @apiGroup BattleShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"place":["Dragonstone"],"factionsOne":["Greens"],"factionsTwo":["Blacks"],"commandersOne":["King Aegon II","Targaryen"],"commandersTwo":["Queen Rhaenyra I Targaryen"],"forcesOne":["Dragonstone Garrison","Aegon's Kingsguard","Sunfyre"],"forcesTwo":["Rhaenyra's","Queensguard"],"casualties":["None","All of Rhaenyra's Queensguard","Queen Rhaenyra I","Prince Aegon","Targaryen "],"_id":"5cad980fb0c0ef00108e5ff8","name":"Ambush at Dragonstone","slug":"Ambush_at_Dragonstone","conflict":"Dance of the Dragons","dateOfBattle":null,"createdAt":"2019-04-10T07:15:27.777Z","updatedAt":"2019-04-10T07:15:27.777Z","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getBySlug(slug): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all battles with slug :slug.
     */
    async getBySlug(req, res) {
        let battles = await this.battleStore.getBySlug(req.params.slug);
        if(battles.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(battles.data);
        } else {
            res.status(404).send(battles.message);
        }
    }

    /**
     * @api {get} /api/show/battles/byLocation/:location Get battles by location
     * @apiVersion 0.0.2
     * @apiName GetBattlesByLocationShow
     * @apiGroup BattleShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"place":["Dragonstone"],"factionsOne":["Greens"],"factionsTwo":["Blacks"],"commandersOne":["King Aegon II","Targaryen"],"commandersTwo":["Queen Rhaenyra I Targaryen"],"forcesOne":["Dragonstone Garrison","Aegon's Kingsguard","Sunfyre"],"forcesTwo":["Rhaenyra's","Queensguard"],"casualties":["None","All of Rhaenyra's Queensguard","Queen Rhaenyra I","Prince Aegon","Targaryen "],"_id":"5cad980fb0c0ef00108e5ff8","name":"Ambush at Dragonstone","slug":"Ambush_at_Dragonstone","conflict":"Dance of the Dragons","dateOfBattle":null,"createdAt":"2019-04-10T07:15:27.777Z","updatedAt":"2019-04-10T07:15:27.777Z","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByLocation(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all battles with location :location.
     */
    async getByLocation(req, res) {
        let battles = await this.battleStore.getByLocation(req.params.location);
        if(battles.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(battles.data);
        } else {
            res.status(404).send(battles.message);
        }
    }

    /**
     * @api {get} /api/show/battles/byConflict/:conflict Get battles by conflict
     * @apiVersion 0.0.2
     * @apiName GetBattlesByConflictShow
     * @apiGroup BattleShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"place":["Dragonstone"],"factionsOne":["Greens"],"factionsTwo":["Blacks"],"commandersOne":["King Aegon II","Targaryen"],"commandersTwo":["Queen Rhaenyra I Targaryen"],"forcesOne":["Dragonstone Garrison","Aegon's Kingsguard","Sunfyre"],"forcesTwo":["Rhaenyra's","Queensguard"],"casualties":["None","All of Rhaenyra's Queensguard","Queen Rhaenyra I","Prince Aegon","Targaryen "],"_id":"5cad980fb0c0ef00108e5ff8","name":"Ambush at Dragonstone","slug":"Ambush_at_Dragonstone","conflict":"Dance of the Dragons","dateOfBattle":null,"createdAt":"2019-04-10T07:15:27.777Z","updatedAt":"2019-04-10T07:15:27.777Z","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByConflict(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all battles with conflict :conflict.
     */
    async getByConflict(req, res) {
        let battles = await this.battleStore.getByConflict(req.params.conflict);
        if(battles.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(battles.data);
        } else {
            res.status(404).send(battles.message);
        }
    }
}

module.exports = BattleController;