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

        describe( 'When loaded', function() {
            it( 'should exist', function() {
                expect(RatingModel).toBeDefined();
            });
        });

        describe( 'when instantiated', function() {
            it( 'should exhibit attributes', function() {
                var rating = new RatingModel({
                    rating: 5
                });
                expect(rating.get('rating')).toEqual(5);
            });
        });
    });
});
