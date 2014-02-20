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
    'app/collection/books',
    'app/view/books',
    'app/model/book'
], function( Backbone, Router, BookCollection, BooksView, BookModel ) {
    'use strict';

    return {
        initialize: function() {
            var contentWrapper = $('#page-content > .page-content-wrapper');

            var router = new Router();
            
            var book = new BookModel({title: 'asd', id: 6, rating: 0});
            var bookCollection = new BookCollection([
                book,
                { title: 'hi', id: 1, rating: 4 },
                { title: 'you', id: 2, rating: 3 }
            ]);

            router.on('route:home', function() {
                        //book.set({rating: 5});
                console.log(book)
                var booksView = new BooksView({ collection: bookCollection });
                booksView.render();
                contentWrapper.html( booksView.$el );
                setTimeout(function() {
                    console.log('add')
                    bookCollection.add([{title: 'asd', id: 3, rating: 0}])

                    setTimeout(function() {
                        bookCollection.remove([{title: 'asd', id: 3, rating: 0}])
                    }, 1000)
                }, 1000)
            });

            Backbone.history.start();
        }
    };
});
