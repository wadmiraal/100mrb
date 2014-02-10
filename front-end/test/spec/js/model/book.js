/**
 * @file
 * Book model specs.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define([ 'app/model/book' ], function( BookModel ) {
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
        });
    });
});
