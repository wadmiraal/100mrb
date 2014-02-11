/**
 * @file
 * Book model specs.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define([ 'app/model/book', 'app/model/rating' ], function( BookModel, RatingModel ) {
    'use strict';

    describe( 'Book model', function() {

        describe( 'when loaded by RequireJS', function() {
            it( 'should exist', function() {
                expect( BookModel ).toBeDefined();
            });
        });

        describe( 'when instantiated', function() {
            it( 'should exhibit attributes', function() {
                var book = new BookModel({
                    title: 'Pride & Prejudice'
                });
                expect( book.get( 'title' ) ).toEqual( 'Pride & Prejudice' );
            });

            it( 'should have its own url logic, different from the collection', function() {
                var bookNew = new BookModel();
                expect( bookNew.url() ).toEqual( '/book' );

                var book1 = new BookModel({ id: 1 });
                expect( book1.url() ).toEqual( '/book/1' );

                var collectionStub = {
                    url: '/books'
                };
                bookNew.collection = collectionStub;
                book1.collection = collectionStub;

                expect( bookNew.url() ).toEqual( '/book' );
                expect( book1.url() ).toEqual( '/book/1' );
            });

            it( 'should have a relationships with a rating collection', function() {
                var bookNew = new BookModel();
                expect( bookNew.get( 'ratings' ) ).not.toBeDefined();

                var book1 = new BookModel({ id: 1 });
                expect( book1.get( 'ratings' ) ).toBeDefined();
                expect( _.result( book1.get( 'ratings' ), 'url' ) ).toEqual( '/book/1/ratings' );

                expect( book1.rating() ).toBe( 0 );
                book1.get( 'ratings' ).push( new RatingModel({ rating: 2, userId: 1 }) );
                book1.get( 'ratings' ).push( new RatingModel({ rating: 4, userId: 2 }) );
                expect( book1.rating() ).toBe( 3 );
            });
        });

        describe( 'when syncing book data', function() {
            it( 'should fetch the ratings data as well', function() {
                var book = new BookModel({ id: 1 });
                var server = sinon.fakeServer.create();
                server.respondWith(
                    'GET',
                    '/book/1',
                    [
                        200,
                        { 'Content-Type': 'application/json' },
                        '{ "title": "Pride & Prejudice", "id": "1", "author": "Jane Asuten" }'
                    ]
                );
                server.respondWith(
                    'GET',
                    '/book/1/ratings',
                    [
                        200,
                        { 'Content-Type': 'application/json' },
                        '[ { "rating": "1", "bookId": "1", "userId": "1" }, { "rating": "4", "bookId": "1", "userId": "2" } ]'
                    ]
                );

                book.fetch();
                server.respond();

                expect( server.requests.length ).toEqual( 2 );
                var request = server.requests[0];
                expect( request.method ).toEqual( 'GET' );
                expect( request.url ).toEqual( '/book/1' );
                request = server.requests[1];
                expect( request.method ).toEqual( 'GET' );
                expect( request.url ).toEqual( '/book/1/ratings' );
                expect( book.get( 'ratings' ).length ).toEqual( 2 );
                expect( book.rating() ).toEqual( 2.5 );

                server.restore();
            });
        });
    });
});
