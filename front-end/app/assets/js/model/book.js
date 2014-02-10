/**
 * @file
 * Book model.
 *
 * Data and information about one book.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define([ 'backbone', 'backbone-associations' ], function( Backbone, a ) {
    'use strict';

    var BookModel = Backbone.AssociatedModel.extend({
        urlRoot: '/book'
    });

    return BookModel;
});
