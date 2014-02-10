/**
 * @file
 * Book model.
 *
 * Data and information about one book.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define([ 'backbone', 'backbone-associations', 'app/collection/ratings' ], function( Backbone, a, RatingCollection ) {
    'use strict';

    var BookModel = Backbone.AssociatedModel.extend({
        urlRoot: '/book',
        relations: [{
            type: Backbone.Many,
            key: 'bookId',
            collectionType: RatingCollection
        }]
    });

    return BookModel;
});
