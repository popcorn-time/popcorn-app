var Router = Backbone.Router.extend({
    routes: {
<<<<<<< HEAD
        'index.html':   App.Controller.Home,
        'search/:term': App.Controller.Search,
=======
        'index(:page).html':   App.Controller.Home,
        'search/:term(/:page)': App.Controller.Search,
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
        'filter/:genre(/:page)': App.Controller.FilterGenre
    }
});

App.Router = new Router();

Backbone.history.start({
    hashChange: false,
    pushState: true
});