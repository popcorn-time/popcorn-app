<<<<<<< HEAD
App.Controller.Search = function (searchTerm, page) {
=======
<<<<<<< HEAD
App.Controller.Search = function (searchTerm) {
    console.log('Searching for ' + searchTerm);

    App.loader(true, i18n.__('searchLoading'));
    window.initialLoading = true;

>>>>>>> popcorn-master
    var movieList = new App.View.MovieList({
        keywords: searchTerm,
        genre: null,
        page: page
    });

    if (App.Page.Search) {
        if (!page || page == '1'){
            console.log('Searching for ' + searchTerm);

            App.loader(true, i18n.__('searchLoading'));
            window.initialLoading = true;
            App.Page.Search.$el.empty();
        }
    } else {
        App.Page.Search = new App.View.Page({
            id: 'search-list'
        });
    }

    App.Page.Search.$el.append(movieList.$el);

<<<<<<< HEAD
    if (!page || page == '1'){
        App.Page.Search.show();
        
        userTracking.pageview('/movies/search?q='+encodeURIComponent(searchTerm)).send();
    }
    else {
        setTimeout(function(){
            movieList.constructor.busy = false;
        }, 1000);
    }
};
=======
    App.Page.Search.show();

    userTracking.pageview('/movies/search?q='+encodeURIComponent(searchTerm)).send();
};
=======
App.Controller.Search = function (searchTerm, page) {
    // Check if page exists
    if (App.Page.Search) {
        // Create page
        App.Page.Search = new App.View.Page({
            id: 'search-list'
        });    
    }
    // Create movie list
    var movieList = new App.View.MovieList({
        keywords: searchTerm,
        genre: null,
        page: page
    });
    
    // Clean up if first page
    if (!page || page == '1'){
        console.log('Searching for ' + searchTerm);
        $('.movie-list').first().empty();
        App.loader(true, i18n.__('searchLoading'));
        window.initialLoading = true;
        App.Page.Search.show();
    }
    
    userTracking.pageview('/movies/search?q='+encodeURIComponent(searchTerm)+((page && page > 1) ? '&page='+page : '')).send();

    setTimeout(function(){
        movieList.constructor.busy = false;
    }, 5000);
};
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
>>>>>>> popcorn-master
