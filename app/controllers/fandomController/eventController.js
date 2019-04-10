const EventStore = require('../../stores/fandom/event');

class EventController {
    constructor() {
        this.eventStore = new EventStore();
    }

    async getAll(req, res) {
        let events = await this.eventStore.getAll();
        if (events.success === STORE_RESPONSE_SUCCESS) {
            return res.status(200).send(events.data);
        } else {
            return res.status(404).send(events.message);
        }
    }
    
    async getByName(req, res) {
        let name = req.params.name ? req.params.name : req.body.name;
        let events = await this.eventStore.getByName(name);
        if (events.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(events.data);
        } else {
            res.status(404).send(events.message);
        }
    }

    async getBySlug(req, res) {
        let slug = req.params.slug ? req.params.slug : req.body.slug;
        let events = await this.eventStore.getByName(slug);
        if (events.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(events.data);
        } else {
            res.status(404).send(events.message);
        }
    }

    async getByConflict(req, res) {
        let conflict = req.params.conflict ? req.params.conflict : req.body.conflict;
        let events = await this.eventStore.getByName(conflict);
        if (events.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(events.data);
        } else {
            res.status(404).send(events.message);
        }
    }

    async getByDate(req, res) {
        let date = req.params.date ? req.params.date : req.body.date;
        let events = await this.eventStore.getByName(date);
        if (events.success === STORE_RESPONSE_SUCCESS) {
            res.status(200).send(events.data);
        } else {
            res.status(404).send(events.message);
        }
    }
}

module.exports = EventController;