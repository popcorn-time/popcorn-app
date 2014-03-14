var Router = Backbone.Router.extend({
    routes: {
<<<<<<< HEAD
        'index.html':   App.Controller.Home,
<<<<<<< HEAD
        'search/:term(/:page)': App.Controller.Search,
=======
        'search/:term': App.Controller.Search,
=======
        'index(:page).html':   App.Controller.Home,
        'search/:term(/:page)': App.Controller.Search,
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
>>>>>>> popcorn-master
        'filter/:genre(/:page)': App.Controller.FilterGenre
    }
});

App.Router = new Router();

Backbone.history.start({
    hashChange: false,
    pushState: true
});