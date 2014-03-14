App.View.Page = Backbone.View.extend({
    className: 'page',

    initialize: function () {
        this.render();
    },

    render: function () {
<<<<<<< HEAD
        this.$el.appendTo('section.container');
=======
        $('.'+this.className).remove();
        this.$el.appendTo('section.container');
        $('<ul class="movie-list"></ul>').appendTo(this.$el);
>>>>>>> 7e4d851bc02082d5bbc0260315fd61fe856d0bdc
    },

    show: function () {
        // Fuck you UI.
        var $el = this.$el.hide(),
            $pages = $('.page').addClass('notransition'),
            $movies = $('.movie').removeClass('loaded');

        // ontransitionend could be buggy here.
        setTimeout(function () {
            $pages.removeClass('notransition').hide();

            $el.show();
        }, 350);

        // having a onDOMRendered could solve this shit.
        if ($el.is(App.Page.Home.$el)) {
            setTimeout(function () {
                $el.find('.movie').addClass('loaded');
            }, 400);
        }
    }
});