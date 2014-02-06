/**
 * @file
 * Rating model specs.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define([ 'app/model/rating' ], function( RatingModel ) {
    'use strict';

    describe( 'Rating model', function() {

        describe( 'when loaded by RequireJS', function() {
            it( 'should exist', function() {
                expect( RatingModel ).toBeDefined();
            });
        });

        describe( 'when instantiated', function() {
            it( 'should exhibit attributes', function() {
                var rating = new RatingModel({
                    rating: 5
                });
                expect( rating.get( 'rating' ) ).toEqual( 5 );
            });

            it( 'should have its own url logic, different from the collection', function() {
                var ratingNew = new RatingModel();
                expect( ratingNew.url() ).toEqual( '/rating' );

                var rating1 = new RatingModel({ id: 1 });
                expect( rating1.url() ).toEqual( '/rating/1' );

                var collectionStub = {
                    url: '/ratings'
                };
                ratingNew.collection = collectionStub;
                rating1.collection = collectionStub;

                expect( ratingNew.url() ).toEqual( '/rating' );
                expect( rating1.url() ).toEqual( '/rating/1' );
            });
        });

        describe( 'when validated', function() {
            it( 'should not accept a rating lesser then 0 or higher then 5', function() {
                var rating = new RatingModel({
                    rating: -1,
                    userId: 1,
                    bookId: 1
                });
                expect( rating.isValid() ).not.toBe( true );

                rating.set( 'rating', 6 );
                expect( rating.isValid() ).not.toBe( true );

                rating.set( 'rating', 0 );
                expect( rating.isValid() ).toBe( true );

                rating.set( 'rating', 5 );
                expect( rating.isValid() ).toBe( true );
            });

            it( 'should always require a userId', function() {
                var rating = new RatingModel({
                    rating: 1,
                    userId: 0,
                    bookId: 1
                });
                expect( rating.isValid() ).not.toBe( true );

                rating.set( 'userId', null );
                expect( rating.isValid() ).not.toBe( true );

                rating.set('userId', 2);
                expect( rating.isValid() ).toBe( true );
            });

            it( 'should always require a bookId', function() {
                var rating = new RatingModel({
                    rating: 1,
                    userId: 1,
                    bookId: 0
                });
                expect( rating.isValid() ).not.toBe( true );

                rating.set( 'bookId', null );
                expect( rating.isValid() ).not.toBe( true );

                rating.set('bookId', 2);
                expect( rating.isValid() ).toBe( true );
            });
        });
    });
});
