App.Controller.Home = function () {


    if (!App.Page.Home) {
        var movieList = new App.View.MovieList({
            searchTerm: null,
            genre: null
        });
        App.Page.Home = new App.View.Page({
            id: 'movie-list'
        });

        App.Page.Home.$el.append(movieList.$el);

        App.sidebar = new App.View.Sidebar({
            el: 'sidebar'
        });
    }

    App.Page.Home.show();

    userTracking.pageview('/movies/popular', 'Popular Movies').send();
};