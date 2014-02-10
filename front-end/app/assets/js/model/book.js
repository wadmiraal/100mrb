/**
 * @file
 * Book model.
 *
 * Data and information about one book.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define([ 'backbone' ], function( Backbone ) {
    'use strict';

    var BookModel = Backbone.Model.extend({
        urlRoot: '/book'
    });

    return BookModel;
});
