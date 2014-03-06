/**
 * @file
 * Book view.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define( 'app/view/book', [ 'jquery', 'underscore', 'backbone', 'app/model/book' ], function( $, _ , Backbone, BookModel ) {
    'use strict';

    var BookView = Backbone.View.extend({
        'class': 'books-list-book',

        tpl: _.template( $( '#books-list-book' ).html() ),

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
                this.$el.html( this.tpl( this.model.toJSON() ) );
            } else {
                this.$el.html( '' );
            }
        }
    });

    return BookView;
});
