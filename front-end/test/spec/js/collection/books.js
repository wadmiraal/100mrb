/**
 * @file
 * Books collection specs.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define([ 'app/collection/books' ], function( BookCollection ) {
    'use strict';

    describe( 'Book collection', function() {

        describe( 'when loaded by RequireJS', function() {
            it( 'should exist', function() {
                expect( BookCollection ).toBeDefined();
            });
        });

        describe( 'when instantiated', function() {
            it( 'should have a URL of /books', function() {
                var books = new BookCollection();
                expect( _.result( books, 'url' ) ).toEqual( '/books' );
            });

            it( 'should make a correct request when synced', function() {
                var books = new BookCollection();
                var server = sinon.fakeServer.create();
                server.respondWith(
                    'GET',
                    '/books',
                    [
                        200,
                        { 'Content-Type': 'application/json' },
                        '{ "response": [ { "title": "title" } ] }'
                    ]
                );

                books.fetch();
                server.respond();

                expect( server.requests.length ).toEqual( 1 );
                var request = server.requests[0];
                expect( request.method ).toEqual( 'GET' );
                expect( request.url ).toEqual( '/books' );

                server.restore();
            });
        });
    });
});          
