App.Controller.FilterGenre = function (genre, page) {
<<<<<<< HEAD
=======
    // Check if page exists
    if (!App.Page.FilterGenre) {
        // Create page
        App.Page.FilterGenre = new App.View.Page({
            id: 'category-list'
        });
    }
	// Create movie list
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
    var movieList = new App.View.MovieList({
        searchTerm: null,
        genre: genre,
        page: page
    });
<<<<<<< HEAD

    if (App.Page.FilterGenre) {
        App.Page.FilterGenre.$el.empty();
    } else {
        App.Page.FilterGenre = new App.View.Page({
            id: 'category-list'
        });
    }

    App.Page.FilterGenre.$el.append(movieList.$el);

    App.Page.FilterGenre.show();

    userTracking.pageview('/movies/'+genre + ((page && page > 1) ? '?page='+page : ''), genre.capitalize() + ' Movies').send();
};
=======
	// Clean up if first page
    if (!page || page == '1'){
        $('.movie-list').first().empty();
        App.Page.FilterGenre.show();
    }
    
    userTracking.pageview('/movies/'+genre + ((page && page > 1) ? '?page='+page : ''), genre.capitalize() + ' Movies').send();
    
    setTimeout(function(){
        movieList.constructor.busy = false;
    }, 5000);
};
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
