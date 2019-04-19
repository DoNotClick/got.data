const jimp = require('jimp');

const CharacterFandom = require('../../models/fandom/character');

class CharacterImageFiller {
    constructor(policy) {
        this.policy = policy;
    }

    async fill() {
        let data = await CharacterFandom.find({}, (err) => {
            if(err) throw new Error(err);
        });

        if(!data) {
            throw new Error('no character data in database available');
        }

        for(let i = 0; i < data.length; i++) {
            if(!data[i].slug || !data[i].image) {
                continue;
            }

            console.log('[FandomCharacterImageFiller] '.green + 'downloading image of', data[i].slug);

            await this.download(data[i].slug, data[i].image);
        }
    }

    // clear not necessary since images will be overwritten
    async clearAll() {
        return;
    }

    async download(slug, image) {
        return new Promise(function (resolve, reject) {
            let fs = require('fs');
            let request = require('request');

            let uri = image;
            let filename = '/misc/images/characters/show/' + slug;

            console.log('[FandomCharacterImageFiller] '.green + 'Downloading: ' + uri);
            request.head(uri, function (err, res, body) {
                if(!err) {
                    let type = res.headers['content-type'].replace(new RegExp('/', 'g'), '.');
                    let downloadTo = filename + '.' + type;
                    downloadTo = downloadTo.replace('.image', '');

                    request(uri).pipe(fs.createWriteStream(__appbase + '..' + downloadTo).on('close', function () {
                        jimp.read(__appbase + '..' + downloadTo, (err, lenna) => {
                            if(err) throw err;
                            lenna.write(__appbase + '..' + filename + '.jpg');

                            resolve(filename + '.jpg');
                            console.log('[FandomCharacterImageFiller] '.green + 'Downloaded to: ' + filename + '.jpg');
                        });
                    }));
                } else {
                    reject();
                }
            });
        });
    }
}

module.exports = CharacterImageFiller;