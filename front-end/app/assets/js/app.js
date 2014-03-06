/**
 * @file
 * Application entrypoint.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define( 'app/app', [ 
    'backbone',
    'app/router/router',
    'app/model/book',
    'app/collection/books',
    'app/view/books',
    'app/view/book'
], function( Backbone, Router, BookModel, BookCollection, BooksView, BookView ) {
    'use strict';

    return {
        initialize: function() {
            var contentWrapper = $('#page-content > .page-content-wrapper');

            var router = new Router();
            
            var bookCollection = new BookCollection();
            bookCollection.fetch();

            router.on( 'route:home', function() {
                // Get the books view and pass it the collection.
                var booksView = new BooksView({ collection: bookCollection });

                // Render and append to the DOM.
                booksView.render();
                contentWrapper.html( booksView.$el );
            });

            router.on( 'route:book', function( id ) {
                // Try getting the book from the collection first.
                var book = bookCollection.get(id);

                // If it's not set, create it.
                if ( !book ) {
                    book = new BookModel({ id: id });
                    book.fetch();
                }

                // Initiate the view.
                var bookView = new BookView({ model: book });

                // Render it and append to the DOM.
                bookView.render();
                contentWrapper.html( bookView.$el );
            });

            Backbone.history.start();
        }
    };
});
