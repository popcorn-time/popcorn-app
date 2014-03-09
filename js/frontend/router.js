var Router = Backbone.Router.extend({
    routes: {
        '':   App.Controller.Home,
        'index.html':   App.Controller.Home,
        'search/:term(/:page)': App.Controller.Search,
        'filter/:genre(/:page)': App.Controller.FilterGenre
    }

});

App.Router = new Router();

var historyStart = Backbone.history.start();
