module.exports = {
    /**
     * @api {post} /api/houses/ Add house
     * @apiVersion 0.0.1
     * @apiName AddHouse
     * @apiDescription Add a house to the collection.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/house.js" target="_blank">house model</a>.
     * @apiGroup Houses
     * @apiHeaderExample {json} Header-Example
     * {"name": "Stark"}
     *
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Success",
     *       "data": newDbEntry
     *     }
     *
     * @apiError (400) PropertyInvalid A property of the request is not valid to the underlying schema.
     * @apiErrorExample {json} PropertyInvalid
     *     HTTP/1.1 400
     *     {
     *          "message": "Error. Property not valid to schema.",
     *          "errorProperty": prop
     *     }
     *
     * @apiError (400) ValidationError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} ValidationError
     *     HTTP/1.1 400
     *     {
     *          "message": "Error. A value for a property is not valid to the underlying schema.",
     *          "error": mongooseError
     *     }
     *
     */
    add: function (req, res) {
        var housesStore = require('../stores/houses');
        housesStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(201).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error. A value for a property is not valid to the underlying schema.', error: message });
        });
    },

    /**
     * @api {get} /api/houses/ Get all houses
     * @apiVersion 0.0.1
     * @apiName GetAllHouses
     * @apiDescription Get all houses.
     * @apiGroup Houses
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     *       "_id": "56d331be37f9bc06554c8af0",
     *       "words": "Hear Me Roar!",
     *       "name": "Lennister",
     *       "__v": 0,
     *       "updatedAt": "2016-02-28T17:43:26.246Z",
     *       "createdAt": "2016-02-28T17:43:26.245Z",
     *       "ancestralWeapon": [],
     *       "title": []
     *    }
     * ]
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getAll: function (req, res) {
        var housesStore = require('../stores/houses');

        housesStore.getAll(function(success,houses) {
            res.status(200).json(houses);
        });
    },

    /**
     * @api {post} /api/houses/ Find houses
     * @apiVersion 0.0.1
     * @apiName FindHouses
     * @apiDescription Find house by search criteria.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/house.js" target="_blank">house model</a>.
     * @apiGroup Houses
     *
     * @apiHeaderExample {json} Header-Example
     * {"region": "Crownlands"} // Find houses in the region crownloands.
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     *
     * {
     *    "message": "Success",
     *    "data": [
     *       {
     *          "_id": "56d331be37f9bc06554c8af0",
     *          "words": "Hear Me Roar!",
     *          "name": "Lennister",
     *          "__v": 0,
     *          "updatedAt": "2016-02-28T17:43:26.246Z",
     *          "createdAt": "2016-02-28T17:43:26.245Z",
     *          "ancestralWeapon": [],
     *          "title": []
     *       }
     *    ]
     * }
     *
     * @apiError (404) NotFound No house with that data existing!
     * @apiErrorExample {json} NotFound
     *     HTTP/1.1 404
     *     {
     *          "message": "Failure. No house with that data existing!",
     *          "data": {"words": "Hear Me Laugh!"}
     *     }
     *
     * @apiError (400) PropertyInvalid A property of the request is not valid to the underlying schema.
     * @apiErrorExample {json} PropertyInvalid
     *     HTTP/1.1 400
     *     {
     *          "message": "Error: Bad request. Usage of non existing schema property!",
     *          "errorProperty": prop
     *     }
     */
    get: function(req,res) {
        var housesStore = require('../stores/houses');
        housesStore.get(req.body, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if (success == 3)
                res.status(404).json({ message: 'Failure. No house with that data existing!',data: message });
            else
                res.status(400).json({ message: 'Error: Bad request. Usage of non existing schema property!', errorProperty: message });
        });
    },
    /**
     * @api {get} /api/houses/:name Get house by name
     * @apiVersion 0.0.1
     * @apiName GetHouseByName
     * @apiDescription Return the house named :name.
     * @apiGroup Houses
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Success",
     *    "data": [
     *       {
     *          "_id": "56d331be37f9bc06554c8af0",
     *          "words": "Hear Me Roar!",
     *          "name": "Lennister",
     *          "__v": 0,
     *          "updatedAt": "2016-02-28T17:43:26.246Z",
     *          "createdAt": "2016-02-28T17:43:26.245Z",
     *          "ancestralWeapon": [],
     *          "title": []
     *       }
     *    ]
     * }
     *
     * @apiError (404) NotFound No house with that data existing!
     * @apiErrorExample {json} NotFound
     *     HTTP/1.1 404
     *     {
     *          "message": "Failure. No house with that data existing!",
     *          "data": {"words": "Hear Me Laugh!"}
     *     }
     */
    getByName: function(req, res) {
        var housesStore = require('../stores/houses');

        housesStore.getByName(req.params.houseName, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No house with that data existing!',data: message });
        });
    },

    /**
     * @api {get} /api/houses/byId/:id Get house by id
     * @apiVersion 0.0.1
     * @apiName GetHouseById
     * @apiDescription Return the house with the id :id.
     * @apiGroup Houses
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Success",
     *    "data": [
     *       {
     *          "_id": "56d331be37f9bc06554c8af0",
     *          "words": "Hear Me Roar!",
     *          "name": "Lennister",
     *          "__v": 0,
     *          "updatedAt": "2016-02-28T17:43:26.246Z",
     *          "createdAt": "2016-02-28T17:43:26.245Z",
     *          "ancestralWeapon": [],
     *          "title": []
     *       }
     *    ]
     * }
     *
     * @apiError (404) NotFound No house with that data existing!
     * @apiErrorExample {json} NotFound
     *     HTTP/1.1 404
     *     {
     *          "message": "Failure. No house with that data existing!",
     *          "data": {"id": "56d331be37f9bc06554c8af1"}
     *     }
     */
    getById: function(req, res) {
        var housesStore = require('../stores/houses');

        housesStore.getById(req.params.houseId, function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No house with that data existing!',data: message });
        });
    },

    /**
     * @api {put} /api/houses/:id Edit house
     * @apiVersion 0.0.1
     * @apiName EditHouse
     * @apiDescription Edit a house.
     * Check the <a href="https://github.com/Rostlab/JS16_ProjectA/blob/master/app/models/house.js" target="_blank">house model</a>.
     * @apiGroup Houses
     *
     * @apiHeaderExample {json} Header-Example
     * {"words": "Fire and Blood"}
     *
     * @apiSuccessExample {json} Success
     *     HTTP/1.1 200 OK
     *     {
     *       "message": "Success",
     *       "data": {
     *         "__v": 0,
     *         "name": "Stark",
     *         "_id": "56d5f1e8756d3131130e5424",
     *         "updatedAt": "2016-03-01T19:47:52.153Z",
     *         "createdAt": "2016-03-01T19:47:52.153Z",
     *         "ancestralWeapon": [],
     *         "title": []
     *       }
     *     }
     *
     * @apiError (404) NotFound No house with that id existing!
     * @apiErrorExample {json} NotFound
     *     HTTP/1.1 404
     *     {
     *          "message": "Error. No house existing with that id.",
     *          "id": id
     *     }
     *
     * @apiError (400) ValidationError A value for a property is not valid to the underlying schema.
     * @apiErrorExample {json} ValidationError
     *     HTTP/1.1 400
     *     {
     *          "message": "Error.",
     *          "error": mongooseError
     *     }
     *
     * @apiError (400) PropertyInvalid A property of the request is not valid to the underlying schema.
     * @apiErrorExample {json} PropertyInvalid
     *     HTTP/1.1 400
     *     {
     *          "message": "Error: Bad request. No such property.",
     *          "errorProperty": prop
     *     }
     */
    edit: function(req, res) {
        var housesStore = require('../stores/houses');

        housesStore.edit(req.params.houseId, req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(404).json({ message: 'Error. No house existing with that id', id: req.params.houseId });
            else if(success == 4)
                res.status(400).json({ message: 'Error: Bad request. No such property.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });
    },

    /**
     * @api {delete} /api/houses/:id Remove house
     * @apiVersion 0.0.1
     * @apiName RemoveHouse
     * @apiDescription Remove the house with the id :id.
     * @apiGroup Houses
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Success"
     * }
     *
     * @apiError (404) NotFound No house with that id existing!
     * @apiErrorExample {json} NotFound
     * HTTP/1.1 404
     * {
     *     "message": "Failure: No house with that id is existing.",
     *     "id": "56d5f1e8756d3131130e5424"
     * }
     */
    remove: function(req,res) {
        var housesStore = require('../stores/houses');
        housesStore.remove(req.params.houseId,function(success) {
            if(success === true)
                res.status(200).json({ message: 'Success.' });
            else
                res.status(404).json({ message: 'Failure: No house with that id is existing.', id: req.params.houseId });
        });
    },
};