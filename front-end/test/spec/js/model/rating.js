/**
 * @file
 * Rating model specs.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

'use strict';
describe( 'Rating model', function() {

    describe( 'when instantiated', function() {
    
        it( 'should exhibit attributes', function() {
            var rating = new RatingModel({
                rating: 5
            });
            expect(rating.get('rating')).toEqual(5);
        });
    });
});
