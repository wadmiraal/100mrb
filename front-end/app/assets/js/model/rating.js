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
        save: function( key, val, options ) {
            // @todo DRY code !! There must be a better way !
            if ( !Backbone.Model.prototype.save.call( this, key, val, options ) ) {
                var errors = this.validate({ 
                    rating: this.get( 'rating' ),
                    userId: this.get( 'userId' ),
                    bookId: this.get( 'bookId' )
                });
                this.trigger( 'error', this, errors );
            }
        },
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
                return errors;
            }
        },
        validateRating: function( rating ) {
            if ( rating === null || rating < 0 || rating > 5 ) {
                return RatingModel.ERROR_RATING_INVALID;
            }
        },
        validateUserId: function( userId ) {
            if ( !userId ) {
                return RatingModel.ERROR_NO_USER;
            }
        },
        validateBookId: function( bookId ) {
            if ( !bookId ) {
                return RatingModel.ERROR_NO_BOOK;
            }
        }
    });

    // Save errors as constants for easier re-use.
    RatingModel.ERROR_RATING_INVALID = 'You can only give a rating between 0 and 5.';
    RatingModel.ERROR_NO_USER = 'The rating must be linked to a user.';
    RatingModel.ERROR_NO_BOOK = 'The rating must be linked to a book.';

    return RatingModel;
});
