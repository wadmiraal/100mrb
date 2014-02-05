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
        }
    });

    return RatingModel;
});
