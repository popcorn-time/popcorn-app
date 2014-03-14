App.getTorrentsCollection = function (options) {

    var url = 'http://yts.re/api/list.json';

    var supportedLanguages = ['english', 'french', 'dutch', 'portuguese', 'romanian', 'spanish', 'turkish', 'brazilian', 
                              'italian', 'german', 'hungarian', 'russian', 'ukrainian', 'finnish', 'bulgarian', 'latvian'];
    if (options.genre) {
        url += '?genre=' + options.genre;
    } else {
        if (options.keywords) {
            url += '?query=' + options.keywords;
        } 
    }

    if (options.page && options.page.match(/\d+/)) {
        var str = url.match(/\?/) ? '&' : '?';

        url += str + 'set=' + options.page;
    }
    var MovieTorrentCollection = Backbone.Collection.extend({
        url: url,
        model: App.Model.Movie,
        parse: function (data) {
            var movies = [];

            data.MovieList.forEach(function (movie) {
                
                var videos = {};
                var torrents = {};
                torrent = '';
                quality = '';
                var subtitles = {};
                movie.subtitles = []; //create empty list because this source does not have subtitles
                // Put the video and torrent list into a {quality: url} format
               
                videos[movie.Quality] = movie.TorrentUrl;
                torrents[movie.Quality] = movie.TorrentUrl;
                
                // Pick the worst quality by default
                if( typeof torrents['720p'] != 'undefined' ){ quality = '720p'; torrent = torrents['720p']; }
                else if( typeof torrents['1080p'] != 'undefined' ){ quality = '1080p'; torrent = torrents['1080p']; }

                for( var k in movie.subtitles ) {
                    if( supportedLanguages.indexOf(movie.subtitles[k].language) < 0 ){ continue; }
                    if( typeof subtitles[movie.subtitles[k].language] == 'undefined' ) {
                        subtitles[movie.subtitles[k].language] = movie.subtitles[k].url;
                    }
                }

                if( (typeof movie.subtitles == 'undefined' || movie.subtitles.length == 0) && (typeof movie.videos == 'undefined' || movie.videos.length == 0) ){ console.log('aaa'); }
                
                movies.push({
                    imdb:       movie.ImdbCode,
                    title:      movie.MovieTitle,
                    year:       movie.MovieYear,
                    runtime:    0,
                    synopsis:   'does not exists',
                    voteAverage:movie.MovieRating,

                    image:      movie.CoverImage,
                    bigImage:   movie.CoverImage,
                    backdrop:   movie.CoverImage,

                    quality:    quality,
                    torrent:    torrent,
                    torrents:   torrents,
                    videos:     videos,
                    subtitles:  subtitles,
                    seeders:    movie.TorrentSeeds,
                    leechers:   movie.TorrentPeers
                });
            });
            
            return movies;
        }
    });

    return new MovieTorrentCollection();
};
