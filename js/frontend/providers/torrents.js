App.getTorrentsCollection = function (options) {

    var start = +new Date(),
        url = 'http://yts.re/api/list.json?sort=seeds&limit=50';

    if (options.keywords) {
        url += '&keywords=' + options.keywords;
    }

    if (options.genre) {
        url += '&genre=' + options.genre;
    }

    if (options.page && options.page.match(/\d+/)) {
        url += '&set=' + options.page;
    }

    var MovieTorrentCollection = Backbone.Collection.extend({
        url: url,
        model: App.Model.Movie,
        parse: function (data) {
            var movies = [],
                memory = {};

            if (data.error || typeof data.MovieList === 'undefined') {
                return movies;
            }

            data.MovieList.forEach(function (movie) {
                // No imdb, no movie.
                if( typeof movie.ImdbCode != 'string' || movie.ImdbCode.replace('tt', '') == '' ){ return; }
                
                var torrents = {};
                torrents[movie.Quality] = movie.TorrentUrl;
                
                // Temporary object
                var movieModel = {
                    imdb: movie.ImdbCode.replace('tt', ''),
                    title: movie.MovieTitleClean,
                    year: movie.MovieYear,
                    runtime: 0,
                    synopsis: "",
                    voteAverage:parseInt(movie.MovieRating, 10),

                    image: movie.CoverImage,
                    bigImage: movie.CoverImage,
                    backdrop: "",

                    quality: movie.Quality,
                    torrent: movie.TorrentUrl,
                    torrents: torrents,
                    videos: {},
                    subtitles: {},
                    seeders: movie.TorrentSeeds,
                    leechers: movie.TorrentPeers
                };


                var stored = memory[movieModel.imdb];

                // Create it on memory map if it doesn't exist.
                if (typeof stored === 'undefined') {
                    stored = memory[movieModel.imdb] = movieModel;
                }

                if (stored.quality !== movieModel.quality && movieModel.quality === '720p') {
                    stored.torrent = movieModel.torrent;
                    stored.quality = '720p';
                }

                // Set it's correspondent quality torrent URL.
                stored.torrents[movie.Quality] = movie.TorrentUrl;

                // Push it if not currently on array.
                if (movies.indexOf(stored) === -1) {
                    movies.push(stored);
                }
            });

            console.log('Torrents found:', data.MovieList.length);

            return movies;
        }
    });

    return new MovieTorrentCollection();
};


/*App.getTorrentsCollection = function (options) {

    var url = 'http://yts.re/api/';

    var supportedLanguages = ['english', 'french', 'dutch', 'portuguese', 'romanian', 'spanish', 'turkish', 'brazilian', 
                              'italian', 'german', 'hungarian', 'russian', 'ukrainian', 'finnish', 'bulgarian', 'latvian'];
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
        var str = url.match(/\?/) ? '&' : '?';
        url += str + 'page=' + options.page;
    }

    var MovieTorrentCollection = Backbone.Collection.extend({
        url: url,
        model: App.Model.Movie,
        parse: function (data) {
            
            var movies = [];

            data.movies.forEach(function (movie) {

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
                    if( supportedLanguages.indexOf(movie.subtitles[k].language) < 0 ){ continue; }
                    if( typeof subtitles[movie.subtitles[k].language] == 'undefined' ) {
                        subtitles[movie.subtitles[k].language] = movie.subtitles[k].url;
                    }
                }

                if( (typeof movie.subtitles == 'undefined' || movie.subtitles.length == 0) && (typeof movie.videos == 'undefined' || movie.videos.length == 0) ){ return; }

                
                movies.push({
                    imdb:       movie.imdb_id,
                    title:      movie.title,
                    year:       movie.year,
                    runtime:    movie.runtime,
                    synopsis:   movie.synopsis,
                    voteAverage:movie.vote_average,

                    image:      movie.poster,
                    bigImage:   movie.poster,
                    backdrop:   movie.backdrop,

                    quality:    quality,
                    torrent:    torrent,
                    torrents:   torrents,
                    videos:     videos,
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
*/