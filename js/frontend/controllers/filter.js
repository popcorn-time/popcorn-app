App.Controller.FilterGenre = function (genre, page) {
    // Check if page exists
    if (!App.Page.FilterGenre) {
        // Create page
        App.Page.FilterGenre = new App.View.Page({
            id: 'category-list'
        });
    }
	// Create movie list
    var movieList = new App.View.MovieList({
        searchTerm: null,
        genre: genre,
        page: page
    });
	// Clean up if first page
    if (!page || page == '1'){
        $('.movie-list').first().empty();
        App.Page.FilterGenre.show();
    }
    
    setTimeout(function(){
        movieList.constructor.busy = false;
    }, 5000);
};
