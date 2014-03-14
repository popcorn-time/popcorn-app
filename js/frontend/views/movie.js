<<<<<<< HEAD
App.View.MovieListItem = Backbone.View.extend({
    tagName: 'li',
    className: 'movie',
    model: App.Model.Movie,

    events: {
        'click a': 'select',
=======
App.View.MovieListItem = Marionette.ItemView.extend({
    tagName: 'li',
    className: 'movie',
    model: App.Model.Movie,
    id: function() {
        return 'movie-'+this.model.get('imdb')
    },

    events: {
        'click a': 'select'
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
    },

    initialize: function () {
        this.render();
    },

<<<<<<< HEAD
=======
    template: _.template('<a href="javascript:;">'+
            '<i class="fa fa-eye fa-3"></i>'+
            '<span class="cover"></span>'+
            '<strong><%- title %></strong>'+
            '<small><%- year %></small>'+
        '</a>'),

    serializeData: function() {
        return _.extend({}, this.model.attributes, {
            title: this.model.getShortTitle()
        });
    },

>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
    select: function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        if (this.$el.hasClass('active')) {
            this.$el.removeClass('active');
            App.sidebar.hide();
        } else {
            this.$el.parent().find('.active').removeClass('active');
            this.$el.addClass('active');
            App.sidebar.load(this.model);
        }
<<<<<<< HEAD
    },

    render: function () {
        if (this.model.get('title').length > 19) {
          var title = this.model.get('title').substring(0, 13) + "...";
        } else {
          var title = this.model.get('title');
        }
        this.$el.attr('id', 'movie-' + this.model.get('imdb')).html(
            '<a href="javascript:;">'+
                '<i class="fa fa-eye fa-3"></i>'+
                '<span class="cover"></span>'+
                '<strong>' + title + '</strong>'+
                '<small>' + this.model.get('year') + '</small>'+
            '</a>');
=======
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
    }
});