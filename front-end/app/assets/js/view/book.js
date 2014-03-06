/**
 * @file
 * Book view.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define( 'app/view/book', [
        'jquery',
        'underscore',
        'backbone',
        'app/model/book'
    ], function( $, _ , Backbone, BookModel ) {
    'use strict';

    var BookView = Backbone.View.extend({
        id: 'book-page',
        tpl: _.template( $( '#book-template' ).html() ),
        initialize: function() {
            if ( !this.model ) {
                this.model = new BookModel();
            }

            var that = this;
            this.model
                .bind( 'change', function() {
                    that.render();
                })
                .bind( 'destroy', function() {
                    that.remove();
                });
        },
        render: function() {
            if ( this.model.get( 'title' ) ) {
                var variables = this.model.toJSON();

                // @todo
                variables.readWidget = '';

                this.$el.html( this.tpl( variables ) );
            } else {
                this.$el.html( '' );
            }
        }
    });

    return BookView;
});
