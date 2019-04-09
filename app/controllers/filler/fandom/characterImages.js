const jimp = require("jimp");

const CharacterFandom = require('../../../models/fandom/characters');

class CharacterImageFiller {
    constructor(policy) {
        this.POLICY_REFILL = 1;
        this.POLICY_UPDATE = 2;
        this.POLICY_SAFE_UPDATE = 3;

        this.policy = policy;
    }

    async fill() {
        /*if(this.POLICY_REFILL === 1)
        {
            await this.clearAll();
        }*/

        let data = await CharacterFandom.find({}, (err) => {
            if (err) throw new Error(err);
        });

        if(!data)
        {
            throw new Error("no character data in database available")
        }

        for(let i = 0; i < data.length; i++)
        {
            if(!data[i].slug || !data[i].image)
            {
                continue;
            }

            console.log("downloading image of", data[i].slug);

            await this.download(data[i].slug, data[i].image)
        }
    }

    // remove collection
    async clearAll() {
        return new Promise(function (resolve) {
            const fs = require('fs');
            const path = require('path');

            const directory = __dirname + '/../../../../misc/images/characters/show/';

            fs.readdir(directory, (err, files) => {
                if (err) throw err;

                for (const file of files) {
                    if(file.search("jpg") === -1 && file.search("png") === -1)
                    {
                        continue;
                    }

                    fs.unlink(path.join(directory, file), err => {
                        if (err) throw err;

                        resolve(true);
                    });
                }
            });
        });
    }

    async download(slug, image) {
        return new Promise(function (resolve, reject) {
            let fs = require('fs');
            let request = require('request');

            let uri = image;
            let filename = '/misc/images/characters/show/' + slug;

            console.log('Downloading: ' + uri);
            request.head(uri, function(err, res, body){
                if(!err) {
                    let type = res.headers['content-type'].replace(new RegExp("/", "g"),'.');
                    let downloadTo = filename+'.'+type;
                    downloadTo = downloadTo.replace(".image",'');

                    request(uri).pipe(fs.createWriteStream(__appbase + '..' + downloadTo).on('close', function() {
                        jimp.read(__appbase + '..' + downloadTo, (err, lenna) => {
                            if (err) throw err;
                            lenna.write(__appbase + '..' + filename + '.jpg');

                            resolve(filename + '.jpg');
                            console.log('Downloaded to: ' + filename + '.jpg');
                        });
                    }));
                }
                else {
                    reject();
                }
            });
        })
    }
}

module.exports = CharacterImageFiller;