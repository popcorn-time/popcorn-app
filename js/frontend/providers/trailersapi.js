var request = require('request'),

    trailerFetchStyle = 'direct',

    magicWords = 'hd trailer';

App.findTrailer = function (model, callback) {
    var doRequest = function () {
        var title = model.get('title'),
            year = model.get('year');

        switch (trailerFetchStyel) {
            case 'direct':
                var requestOptions = {
                    url: 'https://gdata.youtube.com/feeds/api/videos?q=' + encodeURI(title + ' ' + year + ' '+ magicWords+'&max-results=1&alt=json')
                };

                request(requestOptions, function(error, response, json) {
                    if (!error && response.statusCode == 200) {
                        try {
                            var trailer = /(watch\?)\??v?=?([^#\&\?]*).*/.exec(JSON.parse(json).feed.entry[0].link[0].href)[2];
                            App.Cache.setItem('trailer', model, trailer);
                            model.set('trailer', trailer);
                            callback(trailer);
                        } catch(e) {
                            return;
                        }
                    }
                });

            break;
            default: // trailersapi.com
                var requestOptions = {
                    url: 'http://trailersapi.com/trailers.json?movie=' + encodeURI(title)
                };
                request(requestOptions, function(error, response, json) {
                    if (!error && response.statusCode == 200) {
                        try {
                            var trailer=/[^>]+src="?([^"\s]+)"/.exec(JSON.parse(json)[0]['code'])[1];
                            App.Cache.setItem('trailer', title, trailer);
                            model.set('trailer', trailer);
                            callback(trailer);
                        } catch(e) {
                            return;
                        }
                    }
                });
        } 

    };

    App.Cache.getItem('trailer', model, function (cachedItem) {
        if (cachedItem) {
            console.log('get from cache');
            cb(cachedItem);
        } else {
            console.log('get from interwebs');
            doRequest();
        }
    });
};