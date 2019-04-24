const EpisodeStore = require('../../stores/fandom/episode');

class EpisodeController {
    constructor() {
        this.epStore = new EpisodeStore();
    }

    /**
     * @api {get} /api/show/episodes Get all episodes
     * @apiVersion 0.0.2
     * @apiName GetAllEpisodeShow
     * @apiGroup EpisodeShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"written_by":["David Benioff","D.B. Weiss"],"characters":["Will","Waymar Royce","Gared","Wildling girl","White Walker 1","White Walker 2","Bran Stark","Jon Snow","Robb Stark","Catelyn Stark","Eddard Stark","Rickon Stark","Sansa Stark","Mordane","Arya Stark","Jeyne Poole","Rodrik Cassel","Jory Cassel","Theon Greyjoy","Lady","Grey Wind","Shaggydog","Summer","Nymeria","Ghost","Jaime Lannister","Cersei Lannister","Maester","Tommy","Joffrey Baratheon","Sandor Clegane","Preston Greenfield","Hodor","Mikken","Robert Baratheon","Tommen Baratheon","Myrcella Baratheon","Tyrion Lannister","Ros","Daenerys Targaryen","Viserys Targaryen","Pentoshi servant","Illyrio Mopatis","Khal","Qotho","Cohollo","Haggo","Benjen Stark","Jorah Mormont","Mago"],"deaths":["Waymar Royce","Gared","Will","Jon Arryn","Dothraki"],"places":["Beyond the Wall","In Pentos","In King's Landing","In the North","First","Deaths","Cast notes"],"_id":"5cad97ffb0c0ef00108e5eb0","title":"Winter Is Coming","season":1,"episode":1,"runtime":62,"directed_by":"Tim Van Patten","createdAt":"2019-04-10T07:15:11.668Z","updatedAt":"2019-04-10T07:15:11.668Z","__v":0},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Episodes collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all episodes currently stored.
     */
    async getAll(req, res) {
        let episodes = await this.epStore.getAll();
        if(episodes.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(episodes.data);
        } else {
            res.status(404).send(episodes.message);
        }
    }

    /**
     * @api {get} /api/show/episodes/:title Get episodes by title
     * @apiVersion 0.0.2
     * @apiName GetEpisodesByTitleShow
     * @apiGroup EpisodeShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     {"written_by":["David Benioff","D.B. Weiss"],"characters":["Will","Waymar Royce","Gared","Wildling girl","White Walker 1","White Walker 2","Bran Stark","Jon Snow","Robb Stark","Catelyn Stark","Eddard Stark","Rickon Stark","Sansa Stark","Mordane","Arya Stark","Jeyne Poole","Rodrik Cassel","Jory Cassel","Theon Greyjoy","Lady","Grey Wind","Shaggydog","Summer","Nymeria","Ghost","Jaime Lannister","Cersei Lannister","Maester","Tommy","Joffrey Baratheon","Sandor Clegane","Preston Greenfield","Hodor","Mikken","Robert Baratheon","Tommen Baratheon","Myrcella Baratheon","Tyrion Lannister","Ros","Daenerys Targaryen","Viserys Targaryen","Pentoshi servant","Illyrio Mopatis","Khal","Qotho","Cohollo","Haggo","Benjen Stark","Jorah Mormont","Mago"],"deaths":["Waymar Royce","Gared","Will","Jon Arryn","Dothraki"],"places":["Beyond the Wall","In Pentos","In King's Landing","In the North","First","Deaths","Cast notes"],"_id":"5cad97ffb0c0ef00108e5eb0","title":"Winter Is Coming","season":1,"episode":1,"runtime":62,"directed_by":"Tim Van Patten","createdAt":"2019-04-10T07:15:11.668Z","updatedAt":"2019-04-10T07:15:11.668Z","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByTitle(title): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return episodes with title :title.
     */
    async getByTitle(req, res) {
        let episodes = await this.epStore.getByTitle(req.params.title);
        if(episodes.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(episodes.data);
        } else {
            res.status(404).send(episodes.message);
        }
    }
}

module.exports = EpisodeController;