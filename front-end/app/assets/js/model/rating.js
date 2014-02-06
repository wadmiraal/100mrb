/**
 * @file
 * Rating model.
 *
 * Persistence and loading of a user's rating for a book.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define([ 'backbone' ], function( Backbone ) {
    'use strict';

    var RatingModel = Backbone.Model.extend({
        defaults: {
            rating: 0
        },
        urlRoot: '/rating',
        validate: function( attributes ) {
            var errors = [];

            var ratingError = this.validateRating( attributes.rating );
            if ( ratingError ) {
                errors.push( ratingError );
            }

            var userIdError = this.validateUserId( attributes.userId );
            if ( userIdError ) {
                errors.push( userIdError );
            }

            var bookIdError = this.validateBookId( attributes.bookId );
            if ( bookIdError ) {
                errors.push( bookIdError );
            }

            if ( errors.length ) {
                return errors.join( '\n' );
            }
        },
        validateRating: function( rating ) {
            if ( rating === null || rating < 0 || rating > 5 ) {
                return 'You can only give a rating between 0 and 5.';
            }
        },
        validateUserId: function( userId ) {
            if ( userId === null || userId === 0 ) {
                return 'The rating must be linked to a user.';
            }
        },
        validateBookId: function( bookId ) {
            if ( bookId === null || bookId === 0 ) {
                return 'The rating must be linked to a book.';
            }
        }
    });

    return RatingModel;
});
