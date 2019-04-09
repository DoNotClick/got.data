const EpisodeMap = require('../../models/map/episode');

class EpisodeStore {
    constructor() {}

    async getAll() {
        try {
            let data = await EpisodeMap.find({});

            if (!data) {
                return { success: -1, message: 'Episode collection empty. Scraping should be started...' };
            } else {
                return { success: 1, data: data };
            }

        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getEpisodesByCharacter(name) {
        try {
            let data = await EpisodeMap.findOne({"characters.name": name});

            if (!data) {
                return { success: 0, message: 'No episodes matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getByName(name) {
        try {
            let data = await EpisodeMap.findOne({name: name});

            if (!data) {
                return { success: 0, message: 'No episodes matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getById(id) {
        try {
            let data = await EpisodeMap.findOne({'_id': id});

            if (!data) {
                return { success: 0, message: 'No episodes matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }

    async getEpisodesByCharacter(character) {
        try {
            let data = await EpisodeMap.findMany({'characters': character});

            if (!data) {
                return { success: 0, message: 'No episodes matched your criteria' };
            } else {
                return { success: 1, data: data };
            }
        } catch (e) {
            return { success: 0, message: 'error in database query! - ' + e }
        }
    }
}
module.exports = EpisodeStore;
