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
        'app/widget/rating',
        'app/widget/read'
    ], function( $, Backbone, BookCollection, BookView, a, b ) {
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
                $element.find( '.book-rating-widget-wrapper' ).ratingWidget({ bookModel: model });
                $element.find( '.book-read-widget-wrapper' ).readWidget({ bookModel: model });
                var $readInput = $element.find( '.book-read-widget-wrapper input' );
                $readInput.click( function() {
                    console.log($readInput.is( ':checked' ))
                    $element.removeClass('books-list-book-read')
                });
                $element.toggleClass( 'books-list-book-read', $readInput.is( ':checked' ) );
                that.$el.append( $element );
            });
        }
    });

    return BooksView;
});
