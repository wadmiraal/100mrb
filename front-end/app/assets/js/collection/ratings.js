/**
 * @file
 * Rating collection.
 *
 * Persistence and loading of a user ratings for one or more books.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define([ 'backbone', 'app/model/rating' ], function( Backbone, RatingModel ) {
    'use strict';

    var RatingCollection = Backbone.Collection.extend({
       // model: RatingModel,
        initialize: function(models, options) {
            if ( options ) {
                if ( options.bookId ) {
                    this.bookId = options.bookId;
                }
            }
        },
        url: function() {
            if ( this.bookId ) {
                return '/book/' + this.bookId + '/ratings';
            } else {
                return '/ratings';
            }
        }
    });

    return RatingCollection;
});
