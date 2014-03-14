App.View.MovieList = Backbone.View.extend({
<<<<<<< HEAD
    tagName: 'ul',

    className: 'movie-list',

    constructor: function (options) {
        this.configure(options || {});
        Backbone.View.prototype.constructor.apply(this, arguments);
    },

    configure: function (options) {
        if (this.options) {
            options = _.extend({}, _.result(this, 'options'), options);
        }
        this.options = options;
    },

    initialize: function (options) {
        // Delete old items
        this.$el.children().detach();
=======
    constructor: function (options) {
        this.configure(options || {});
        Backbone.View.prototype.constructor.apply(this, arguments);
    },

    configure: function (options) {
        if (this.options) {
            options = _.extend({}, _.result(this, 'options'), options);
        }
        this.options = options;
    },

    initialize: function (options) {
        // Bind element on existing list
        this.$el = $('.movie-list').first();
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc

        this.collection = App.getTorrentsCollection(options);

        this.collection.fetch();

        this.listenTo(this.collection, 'sync', this.render);
        this.listenTo(this.collection, 'rottenloaded', this.render);
    },

    empty: function () {
        this.$el.append('<div class="no-results">' + i18n.__('noResults') + '</div>');
        return false;
    },

    render: function () {

        if( window.initialLoading ) {
            App.loader(false);
        }

        if (this.collection.length === 0) {
            return this.empty();
        }


        var movieList = this;

<<<<<<< HEAD
        $.each(this.collection.models, function () {
<<<<<<< HEAD

=======
        
=======
        $.each(this.collection.models, function (index) {

>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
>>>>>>> popcorn-master
            // Only append not yet appended elements
            this.view.render();
            var $movie = this.view.$el;
            var $currentEl = movieList.$el.find('#movie-'+ this.get('imdb') );

<<<<<<< HEAD
            if ( ! $currentEl.length ) {
                $movie.appendTo(movieList.$el);
                $currentEl = $movie;

=======
<<<<<<< HEAD
            if ( ! $currentEl.length ) {            
                $movie.appendTo(movieList.$el);
                $currentEl = $movie;
                
=======
            if ( ! $currentEl.length ) {
                $movie.appendTo(movieList.$el);
                $currentEl = $movie;

>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
>>>>>>> popcorn-master
                setTimeout(function () {
                    $movie.addClass('loaded');
                }, 50);
            }
<<<<<<< HEAD

=======
<<<<<<< HEAD
            
>>>>>>> popcorn-master
            // Check for IMDB id and also image loaded (required for view)
            // We can also check if the subtitles loaded with this.get('subtitlesLoaded')
            if (this.get('infoLoaded') && ! $movie.hasClass('fullyLoaded')) {

                $movie.addClass('fullyLoaded');

                var $newCover = $('<img src="' + this.get('image') + '" class="real hidden" alt="' + this.get('title') + '" />');
                $currentEl.find('.cover').append( $newCover );
<<<<<<< HEAD

=======
                
=======

            // Check for IMDB id and also image loaded (required for view)
            // We can also check if the subtitles loaded with this.get('subtitlesLoaded')
            if (! $movie.hasClass('fullyLoaded')) {

                $movie.addClass('fullyLoaded');

                var $newCover = $('<img src="' + this.get('image') + '" class="real hidden" alt="' + this.get('title') + '" />');
                $currentEl.find('.cover').append( $newCover );

>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
>>>>>>> popcorn-master
                $newCover.load(function(){
                    $(this).removeClass('hidden');
                });
            }
<<<<<<< HEAD


=======
<<<<<<< HEAD
            
>>>>>>> popcorn-master
        });

        var page           = 1;
        var $scrollElement = movieList.$el.parent();
        if (!this.options.paginationDisabled){
            $scrollElement.scroll(function(){
                if (!movieList.constructor.busy){
                    var totalSize       = $scrollElement.prop('scrollHeight');
                    var currentPosition = $scrollElement.scrollTop();
                    var scrollBuffer    = (15 / 100) * totalSize;
                    if (currentPosition > 0){
                        currentPosition += $scrollElement.height();
                    }
                    if (currentPosition >= (totalSize - scrollBuffer)){
                        movieList.constructor.busy = true;
                        page++;
                        if (movieList.options.genre){
                            App.Router.navigate('filter/' + movieList.options.genre + '/' + page, { trigger: true });
                        }
                        else {
                            // uncomment this line when the API start accepting the page param to paginate ;)
                            //App.Router.navigate('search/' + movieList.options.keywords + '/' + page, { trigger: true });
                        }
                    }
                }
            });
        }
    }
<<<<<<< HEAD
},{
  busy: false
=======
=======


        });

        var $scrollElement = movieList.$el.parent();
        if (!$scrollElement.data('page') || $scrollElement.data('section') != movieList.options.genre){
            $scrollElement.data('page', 1);
            $scrollElement.data('section', movieList.options.genre);
        }
        if (!this.options.paginationDisabled){
            $scrollElement.scroll(function(){
                if (!movieList.constructor.busy){
                    var totalSize       = $scrollElement.prop('scrollHeight');
                    var currentPosition = $scrollElement.scrollTop();
                    var scrollBuffer    = (15 / 100) * totalSize;
                    if (currentPosition > 0){
                        currentPosition += $scrollElement.height();
                    }
                    if (currentPosition >= (totalSize - scrollBuffer)){
                        movieList.constructor.busy = true;
                        var page    = parseInt($scrollElement.data('page'));
                        var section = $scrollElement.data('section');
                        page++;
                        $scrollElement.data('page', page);

                        if (section){
                            App.Router.navigate('filter/' + section + '/' + page, { trigger: true });
                        }
                        else if (movieList.options.keywords) {
                            section = 'search';
                            // uncomment this line when the API start accepting the page param to paginate ;)
                            //App.Router.navigate('search/' + encodeURIComponent(movieList.options.keywords) + '/' + page, { trigger: true });
                        }
                        else {
                            section = 'index';
                            App.Router.navigate(section + page + '.html', { trigger: true });
                        }

                        console.log(section + ' page ' + page);
                    }
                }
            });
        }
    }
},{
    busy: false
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
>>>>>>> popcorn-master
});
