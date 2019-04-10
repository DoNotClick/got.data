const EventStore = require('../../stores/westeros/event');

class EventController {
    constructor() {
        this.eventStore = new EventStore();
    }

    async getAll(req, res) {
        let events = await this.eventStore.getAll();
        if (events.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(events.data);
        } else {
            res.status(404).send(events.message);
        }
    }
    
    async getByName(req, res) {
        let events = await this.eventStore.getByName(req.params.name);
        if (events.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(events.data);
        } else {
            res.status(404).send(events.message);
        }
    }
}
module.exports = EventController;