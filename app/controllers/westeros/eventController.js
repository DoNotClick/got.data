const EventStore = require('../../stores/westeros/event');

class EventController {
    constructor() {
        this.eventStore = new EventStore();
    }

    /**
     * @api {get} /api/book/events Get all events
     * @apiVersion 0.0.2
     * @apiName GetAllEventsBook
     * @apiGroup EventBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *     [{"_id":"5cad97c6b0c0ef00108e5362","name":"Before the coming of men","age":"Dawn Age","createdAt":"2019-04-10T07:14:14.478Z","updatedAt":"2019-04-10T07:14:14.478Z","__v":0},..,{..}]
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
            res.status(200).send(events.data);
        } else {
            res.status(404).send(events.message);
        }
    }

    /**
     * @api {get} /api/book/events/:name Get events by name
     * @apiVersion 0.0.2
     * @apiName GetEventsByNameBook
     * @apiGroup EventBook
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 200 OK
     *
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
        let events = await this.eventStore.getByName(req.params.name);
        if(events.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(events.data);
        } else {
            res.status(404).send(events.message);
        }
    }
}

module.exports = EventController;