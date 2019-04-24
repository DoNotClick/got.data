const EventStore = require('../../stores/fandom/event');

class EventController {
    constructor() {
        this.eventStore = new EventStore();
    }

    /**
     * @api {get} /api/show/events Get all events
     * @apiVersion 0.0.2
     * @apiName GetAllEventsShow
     * @apiGroup EventShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"place":["Dragonstone ","Westeros"],"participants":[],"factions":["House Baratheon of Dragonstone","House Baratheon of Dragonstone","House Targaryen","House Targaryen"],"leaders":[],"casualties":[],"_id":"5cad9805b0c0ef00108e5f43","name":"Abandonment of Dragonstone","slug":"Abandonment_of_Dragonstone","conflict":"War of the Five Kings / Daenerys Targaryen's invasion of Westeros","createdAt":"2019-04-10T07:15:17.441Z","updatedAt":"2019-04-10T07:15:17.441Z","__v":0},..,{..}]
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getAll(): Event collection empty. Scraping should be started...
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return all events currently stored.
     */
    async getAll(req, res) {
        let events = await this.eventStore.getAll();
        if(events.success === STORE_RESPONSE_SUCCESS) {
            return res.status(200).send(events.data);
        } else {
            return res.status(404).send(events.message);
        }
    }

    /**
     * @api {get} /api/show/events/:name Get events by name
     * @apiVersion 0.0.2
     * @apiName GetEventsByNameShow
     * @apiGroup EventShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     "place":["Dragonstone ","Westeros"],"participants":[],"factions":["House Baratheon of Dragonstone","House Baratheon of Dragonstone","House Targaryen","House Targaryen"],"leaders":[],"casualties":[],"_id":"5cad9805b0c0ef00108e5f43","name":"Abandonment of Dragonstone","slug":"Abandonment_of_Dragonstone","conflict":"War of the Five Kings / Daenerys Targaryen's invasion of Westeros","createdAt":"2019-04-10T07:15:17.441Z","updatedAt":"2019-04-10T07:15:17.441Z","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByName(name): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return events named :name.
     */
    async getByName(req, res) {
        let name = req.params.name ? req.params.name : req.body.name;
        let events = await this.eventStore.getByName(name);
        if(events.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(events.data);
        } else {
            res.status(404).send(events.message);
        }
    }

    /**
     * @api {get} /api/show/events/bySlug/:slug Get events by slug
     * @apiVersion 0.0.2
     * @apiName GetEventsBySlugShow
     * @apiGroup EventShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     "place":["Dragonstone ","Westeros"],"participants":[],"factions":["House Baratheon of Dragonstone","House Baratheon of Dragonstone","House Targaryen","House Targaryen"],"leaders":[],"casualties":[],"_id":"5cad9805b0c0ef00108e5f43","name":"Abandonment of Dragonstone","slug":"Abandonment_of_Dragonstone","conflict":"War of the Five Kings / Daenerys Targaryen's invasion of Westeros","createdAt":"2019-04-10T07:15:17.441Z","updatedAt":"2019-04-10T07:15:17.441Z","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getBySlug(slug): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return events with slug :slug.
     */
    async getBySlug(req, res) {
        let slug = req.params.slug ? req.params.slug : req.body.slug;
        let events = await this.eventStore.getByName(slug);
        if(events.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(events.data);
        } else {
            res.status(404).send(events.message);
        }
    }

    /**
     * @api {get} /api/show/events/byConflict/:conflict Get events by conflict
     * @apiVersion 0.0.2
     * @apiName GetEventsByConflictShow
     * @apiGroup EventShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     "place":["Dragonstone ","Westeros"],"participants":[],"factions":["House Baratheon of Dragonstone","House Baratheon of Dragonstone","House Targaryen","House Targaryen"],"leaders":[],"casualties":[],"_id":"5cad9805b0c0ef00108e5f43","name":"Abandonment of Dragonstone","slug":"Abandonment_of_Dragonstone","conflict":"War of the Five Kings / Daenerys Targaryen's invasion of Westeros","createdAt":"2019-04-10T07:15:17.441Z","updatedAt":"2019-04-10T07:15:17.441Z","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByConflict(conflict): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return events with conflict :conflict.
     */
    async getByConflict(req, res) {
        let conflict = req.params.conflict ? req.params.conflict : req.body.conflict;
        let events = await this.eventStore.getByName(conflict);
        if(events.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(events.data);
        } else {
            res.status(404).send(events.message);
        }
    }

    /**
     * @api {get} /api/show/events/byDate/:date Get events by conflict
     * @apiVersion 0.0.2
     * @apiName GetEventsByDateShow
     * @apiGroup EventShow
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     "place":["Dragonstone ","Westeros"],"participants":[],"factions":["House Baratheon of Dragonstone","House Baratheon of Dragonstone","House Targaryen","House Targaryen"],"leaders":[],"casualties":[],"_id":"5cad9805b0c0ef00108e5f43","name":"Abandonment of Dragonstone","slug":"Abandonment_of_Dragonstone","conflict":"War of the Five Kings / Daenerys Targaryen's invasion of Westeros","createdAt":"2019-04-10T07:15:17.441Z","updatedAt":"2019-04-10T07:15:17.441Z","__v":0}
     * @apiSuccessExample {json} Empty-Success-Response
     *     HTTP/1.1 200 OK
     *     []
     * @apiErrorExample {json} NoData
     *      HTTP/1.1 404
     *      getByDate(date): Result empty
     * @apiErrorExample {json} ErrorInDatabase
     *      HTTP/1.1 404
     *      error in database query! - err
     * @apiDescription Return events with date :date.
     */
    async getByDate(req, res) {
        let date = req.params.date ? req.params.date : req.body.date;
        let events = await this.eventStore.getByName(date);
        if(events.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(events.data);
        } else {
            res.status(404).send(events.message);
        }
    }
}

module.exports = EventController;