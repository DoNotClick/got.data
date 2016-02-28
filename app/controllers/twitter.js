module.exports = {
    /**
     * @api {get} /api/twitter/search/:byKeywords
     * @apiVersion 0.0.1
     * @apiName Default
     * @apiGroup Default
     * @apiPermission none
     *
     * @apiDescription This function streams related Tweets in real-time. Make sure to replace :byKeywords.
     */
    searchTwitter: function (req, res) {
        var twitter = require('twitter');
        var config = require(__base + 'cfg/config.json');
        var keywords = req.params.byKeywords;

        var client = new twitter({
            consumer_key: config.twitter.consumer_key,
            consumer_secret: config.twitter.consumer_secret,
            access_token_key: config.twitter.access_token_key,
            access_token_secret: config.twitter.access_token_secret
        });

        client.stream('statuses/filter', {track: keywords}, function (stream) {
            stream.on('data', function (tweet) {
                console.log(tweet.text);
                res.status(200).json(tweet);
            });
            stream.on('error', function (error) {
                res.status(400).json({ message: 'Error.', error: error });
            });
        });
    }
};