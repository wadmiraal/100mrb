/**
 * @file
 * Rating model specs.
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
                expect( ratings.url() ).toEqual( '/ratings' );

                var ratings = new RatingCollection( [], { bookId: 1 } );
                expect( ratings.url() ).toEqual( '/book/1/ratings' );
            });
        });
    });
});          
