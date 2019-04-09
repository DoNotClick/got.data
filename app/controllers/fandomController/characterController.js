
'use strict';
const CharacterStore = require('../../stores/fandom/characterStore');
class CharacterController {
    constructor() {
        this.charStore = new CharacterStore();
    }
    // ! 
    // async getMultiple(req, res) {
    //     let characters = await this.baStore.get()
    // }

    async getAll(req, res) {
        let characters = await this.charStore.getAll();
        if (characters.success === 1) {
            return res.status(200).send(characters.data);
        } else {
            return res.status(404).send(characters.message);
        }
    }
    
    async getByName(req, res) {
        let characters = await this.charStore.getByName(req.params.name);
        if (characters.success === 1) {
            res.status(200).send(characters.data);
        } else {
            res.status(404).send(characters.message);
        }
    }

    async getBySlug(req, res) {
        let characters = await this.charStore.getBySlug(req.params.slug);
        if (characters.success === 1) {
            res.status(200).send(characters.data);
        } else {
            res.status(404).send(characters.message);
        }
    }

    async getByHouse(req, res) {
        let characters = await this.charStore.getByHouse(req.params.house);
        if (characters.success === 1) {
            res.status(200).send(characters.data);
        } else {
            res.status(404).send(characters.message);
        }
    }

    async updateGeneral(req, res) {
        let slug = req.params.slug ? req.params.slug : req.body.slug;
        let plod = req.params.plod ? req.params.plod : req.body.plod;
        let longevity = req.params.longevity ? req.params.longevity : req.body.longevity;
        let longevityStart = req.params.longevityStart ? req.params.longevityStart : req.body.longevityStart;
        let character = await this.charStore.updateGeneral(slug, plod, longevity, longevityStart);
        if (character.success === 1) {
            res.status(200).send(character.message);
        } else {
            res.status(404).send(character.message);
        } 
    }

    async updateGroupB(req, res) {
        let slug = req.params.slug ? req.params.slug : req.body.slug;
        let plod = req.params.plod ? req.params.plod : req.body.plod;
        let longevity = req.params.longevity ? req.params.longevity : req.body.longevity;
        let longevityStart = req.params.longevityStart ? req.params.longevityStart : req.body.longevityStart;
        let character = await this.charStore.updateGroupB(slug, plod, longevity, longevityStart);
        if (character.success === 1) {
            res.status(200).send(character.message);
        } else {
            res.status(404).send(character.message);
        } 
    }

    async updateGroupC(req, res) {
        let slug = req.params.slug ? req.params.slug : req.body.slug;
        let plod = req.params.plod ? req.params.plod : req.body.plod;
        let longevity = req.params.longevity ? req.params.longevity : req.body.longevity;
        let longevityStart = req.params.longevityStart ? req.params.longevityStart : req.body.longevityStart;
        let character = await this.charStore.updateGroupC(slug, plod, longevity, longevityStart);
        if (character.success === 1) {
            res.status(200).send(character.message);
        } else {
            res.status(404).send(character.message);
        } 
    }
}
module.exports = CharacterController;