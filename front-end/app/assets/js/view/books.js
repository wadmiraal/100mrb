/**
 * @file
 * The book list view.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define( 'app/view/books', [ 'backbone', 'app/collection/books', 'app/view/book' ], function( Backbone, BookCollection, BookView ) {
    'use strict';

    var BooksView = Backbone.View.extend({
        id: 'books-list',
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
            this.collection.forEach(function( model ) {
                var bookView = new BookView({ model: model });
                bookView.render();
                that.$el.append( bookView.$el );
            });
        }
    });

    return BooksView;
});
