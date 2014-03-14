App.getTorrentsCollection = function (options) {

<<<<<<< HEAD
    var start = +new Date(),
        url = 'http://subapi.com/';

    var supportedLanguages = ['english', 'french', 'dutch', 'portuguese', 'romanian', 'spanish', 'turkish', 'brazilian', 'italian'];

=======
    var url = 'http://subapi.com/';

    var supportedLanguages = ['english', 'french', 'dutch', 'portuguese', 'romanian', 'spanish', 'turkish', 'brazilian', 
                              'italian', 'german', 'hungarian', 'russian', 'ukrainian', 'finnish', 'bulgarian', 'latvian'];
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
    if (options.genre) {
        url += options.genre.toLowerCase() + '.json';
    } else {
        if (options.keywords) {
            url += 'search.json?query=' + options.keywords;
        } else {
            url += 'popular.json';
        }
    }

    if (options.page && options.page.match(/\d+/)) {
<<<<<<< HEAD
        var str = url.match(/\?/) ? '&' : '?';
        url += str + 'page=' + options.page;
=======
<<<<<<< HEAD
        url += '?page=' + options.page;
=======
        var str = url.match(/\?/) ? '&' : '?';
        url += str + 'page=' + options.page;
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
>>>>>>> popcorn-master
    }

    var MovieTorrentCollection = Backbone.Collection.extend({
        url: url,
        model: App.Model.Movie,
        parse: function (data) {
            
            var movies = [];

            data.movies.forEach(function (movie) {

<<<<<<< HEAD
                var torrents = {};
                torrent = '';
                var subtitles = {};

                for( var k in movie.torrents ) {
                    if( typeof torrents[movie.torrents[k].quality] == 'undefined' ) {
                        torrents[movie.torrents[k].quality] = movie.torrents[k].url;
                    }
                }

                // Pick the worst quality by default
                if( typeof torrents['1080p'] != 'undefined' ){ quality = '1080p'; torrent = torrents['1080p']; }
                if( typeof torrents['720p'] != 'undefined' ){ quality = '720p'; torrent = torrents['720p']; }

                for( var k in movie.subtitles ) {

                    //Change for regionalization: PT-Br and PT-Pt
                    var link = movie.subtitles[k].url;
                    var linkData = (link.substr(link.lastIndexOf('/') + 1)).split('-');
                    var language = linkData[linkData.length-3];
                    if (language == "portuguese" && linkData[linkData.length-4] == 'brazilian'){
                        movie.subtitles[k].language = linkData[linkData.length-4];
                    }

=======
                var videos = {};
                var torrents = {};
                torrent = '';
                quality = '';
                var subtitles = {};

                // Put the video and torrent list into a {quality: url} format
                for( var k in movie.videos ) {
                    if( typeof videos[movie.videos[k].quality] == 'undefined' ) {
                      videos[movie.videos[k].quality] = movie.videos[k].url;
                    }
                }

                for( var k in movie.torrents ) {
                  if( typeof torrents[movie.torrents[k].quality] == 'undefined' ) {
                    torrents[movie.torrents[k].quality] = movie.torrents[k].url;
                  }
                }

                // Pick the worst quality by default
                if( typeof torrents['720p'] != 'undefined' ){ quality = '720p'; torrent = torrents['720p']; }
                else if( typeof torrents['1080p'] != 'undefined' ){ quality = '1080p'; torrent = torrents['1080p']; }

                for( var k in movie.subtitles ) {
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
                    if( supportedLanguages.indexOf(movie.subtitles[k].language) < 0 ){ continue; }
                    if( typeof subtitles[movie.subtitles[k].language] == 'undefined' ) {
                        subtitles[movie.subtitles[k].language] = movie.subtitles[k].url;
                    }
                }
<<<<<<< HEAD
=======

                if( (typeof movie.subtitles == 'undefined' || movie.subtitles.length == 0) && (typeof movie.videos == 'undefined' || movie.videos.length == 0) ){ return; }
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
                
                movies.push({
                    imdb:       movie.imdb_id,
                    title:      movie.title,
                    year:       movie.year,
                    runtime:    movie.runtime,
                    synopsis:   movie.synopsis,
                    voteAverage:movie.vote_average,

<<<<<<< HEAD
                    coverImage: movie.poster,
                    backdropImage: movie.backdrop,
=======
                    image:      movie.poster,
                    bigImage:   movie.poster,
                    backdrop:   movie.backdrop,
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc

                    quality:    quality,
                    torrent:    torrent,
                    torrents:   torrents,
<<<<<<< HEAD
=======
                    videos:     videos,
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
                    subtitles:  subtitles,
                    seeders:    movie.seeders,
                    leechers:   movie.leechers
                });
            });

            return movies;
        }
    });

    return new MovieTorrentCollection();
};
