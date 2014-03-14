var request = require('request'),

    baseUrl = 'http://trailersapi.com/trailers.json?movie=';

App.findTrailer = function (title, callback) {
    var doRequest = function () {
        var requestOptions = {
            url: baseUrl + '/' + encodeURI(title)
        };

        request(requestOptions, function(error, response, json) {
            if (!error && response.statusCode == 200) {
            	var trailer=/[^>]+src="?([^"\s]+)"/.exec(JSON.parse(json)[0]['code'])[1];
                App.Cache.setItem('trailer', title, trailer);
                callback(trailer);
            }
        });
    };

    App.Cache.getItem('trailer', title, function (cachedItem) {
        if (cachedItem) {
            cb(cachedItem);
        } else {
            doRequest();
        }
    });
};