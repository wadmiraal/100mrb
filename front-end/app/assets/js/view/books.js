/**
 * @file
 * The book list view.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define( 'app/view/books', [
        'jquery',
        'backbone',
        'app/collection/books',
        'app/view/book',
        'app/widget/rating'
    ], function( $, Backbone, BookCollection, BookView, a ) {
    'use strict';

    var BooksView = Backbone.View.extend({
        id: 'books-list',
        tpl: _.template( $( '#books-list-book-template' ).html() ),
        initialize: function() {
            if ( !this.collection ) {
                this.collection = new BookCollection();
                this.collection.fetch();
            }

            var that = this;
            this.collection
                .bind( 'add', function() {
                    that.render();
                })
                .bind( 'remove', function() {
                    that.render();
                });
        },
        render: function() {
            this.$el.empty();

            var that = this;
            this.collection.forEach( function( model ) {
                var $element = $( '<div class="books-list-book" />' );
                $element.append( that.tpl( model.toJSON() ) );
                $element.find('.book-rating-widget-wrapper').ratingWidget({ userId: 9, bookId: 2 });
                that.$el.append( $element );
            });
        }
    });

    return BooksView;
});
