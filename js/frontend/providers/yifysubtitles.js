var request = require('request'),
    cheerio = require('cheerio'),
    zlib = require('zlib'),
    fs = require('fs'),

    appUserAgent = 'PopcornHour v1',

    baseUrl = 'http://www.yifysubtitles.com',

    Languages = window.Languages = {
        'spanish'   : 'Español',
        'english'   : 'English',
        'french'    : 'Français',
        'turkish'   : 'Türkçe',
        'romanian'  : 'Română',
        'portuguese': 'Português',
        'brazilian' : 'Português-Br',
        'dutch'     : 'Nederlands',
        'arabic'    : 'العربيه',
        'swedish'   : 'Svenska'
    };

App.findSubtitle = function (model, cb, isFallback) {
    var doRequest = function () {
        var requestOptions = {
            url: baseUrl + '/movie-imdb/tt' + model.imdb,
            headers: {
                'User-Agent': appUserAgent
            }
        };

        request(requestOptions, function(error, response, html) {
            if (!error && response.statusCode == 200) {
                var queries = {},
                    subs = {};

                var $c = cheerio.load(html);

                $c('ul.other-subs>li').each(function(i, element){
                    var a = $c(this).children('.subtitle-download');
                    if(a.attr("href") !== undefined) {
                        var link = a.attr("href");
                        var linkData = (link.substr(link.lastIndexOf('/') + 1)).split('-');
                        var language = linkData[linkData.length-3];

                        //This verification sets the subtitle to portuguese of Brazil or European(regionalization)
                        if(language == 'portuguese' && linkData[linkData.length-4] == 'brazilian'){
                            language = linkData[linkData.length-4];
                        }
                        
                        // TODO: we can get more info from the site (like rating, hear-impaired)
                        if ($.isEmptyObject(queries[language])
                            && !($.isEmptyObject(Languages[language]))) {
                            var subtitleData = {
                                'link' : baseUrl+link
                            };
                            queries[language] = subtitleData;
                        }
                    }
                });

                Object.keys(Languages).forEach(function (language, key) {
                    if (!($.isEmptyObject(queries[language]))) {
                        var subtitleLink = queries[language]["link"];
                        var subRequestOptions = {
                            url: subtitleLink,
                            headers: {
                                'User-Agent': appUserAgent
                            }
                        };
                        request(subRequestOptions, function (error, response, html) {
                            if (!error && response.statusCode == 200) {
                                var $c = cheerio.load(html);
                                var subDownloadLink = $c('a.download-subtitle').attr('href');
                                if (!(language in subs)) {
                                    subs[language] = subDownloadLink;
                                    App.Cache.setItem('subtitle', model, subs);
                                    // Callback
                                    cb(subs);
                                }
                            }
                        });
                    }
                });
            }
        });
    };

    App.Cache.getItem('subtitle', model, function (cachedItem) {
        if (cachedItem) {
            cb(cachedItem);
        } else {
            doRequest();
        }
    });
};
