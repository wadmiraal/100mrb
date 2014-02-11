/**
 * @file
 * Ratings collection specs.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define([ 'app/collection/ratings' ], function( RatingCollection ) {
    'use strict';

    describe( 'Rating collection', function() {

        describe( 'when loaded by RequireJS', function() {
            it( 'should exist', function() {
                expect( RatingCollection ).toBeDefined();
            });
        });

        describe( 'when instantiated', function() {
            it( 'should have a different URL scheme if linked to a book', function() {
                var ratings = new RatingCollection();
                expect( _.result( ratings, 'url' ) ).toEqual( '/ratings' );

                var bookRatings = new RatingCollection( [], { bookId: 1 } );
                expect( _.result( bookRatings, 'url' ) ).toEqual( '/book/1/ratings' );
            });

            it( 'should make a correct request when synced', function() {
                var ratings = new RatingCollection();
                var server = sinon.fakeServer.create();
                server.respondWith(
                    'GET',
                    '/ratings',
                    [
                        200,
                        { 'Content-Type': 'application/json' },
                        '[ { rating: 1, userId: 1, bookId: 1 }, { rating: 2, userId: 2, bookId: 2 } ]'
                    ]
                );
                server.respondWith(
                    'GET',
                    '/book/1/ratings',
                    [
                        200,
                        { 'Content-Type': 'application/json' },
                        '[ { rating: 1, userId: 1, bookId: 1 }, { rating: 2, userId: 2, bookId: 2 } ]'
                    ]
                );

                ratings.fetch();
                server.respond();

                expect( server.requests.length ).toEqual( 1 );
                var request = server.requests[0];
                expect( request.method ).toEqual( 'GET' );
                expect( request.url ).toEqual( '/ratings' );

                ratings = new RatingCollection( [], { bookId: 1 } );

                ratings.fetch();
                server.respond();

                expect( server.requests.length ).toEqual( 2 );
                var request = server.requests[1];
                expect( request.method ).toEqual( 'GET' );
                expect( request.url ).toEqual( '/book/1/ratings' );

                server.restore();
            });
        });
    });
});          
