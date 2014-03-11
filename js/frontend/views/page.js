App.View.Page = Backbone.View.extend({
    className: 'page',

    initialize: function () {
        this.render();
        this.attachScrollEvent();
    },

    render: function () {
        this.$el.appendTo('section.container');
    },

    attachScrollEvent: function() {
        $elBody = $('body'),
        $movieList = $('#movie-list'),
        $categoryList = $('#category-list');

        $elBody.unbind().on('click', '#goto-top', function() {
            if ( $movieList.is(':visible') ) {
                $movieList.animate({
                    scrollTop: 0
                });
            } else if ( $categoryList.is(':visible') ) {
                $categoryList.animate({
                    scrollTop: 0
                });
            }
        });
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