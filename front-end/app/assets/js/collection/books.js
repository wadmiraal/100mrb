/**
 * @file
 * Book collection.
 *
 * Loading of one or more books.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define([ 'backbone', 'app/model/book' ], function( Backbone, BookModel ) {
    'use strict';

    var BookCollection = Backbone.Collection.extend({
        model: BookModel,
        url: '/books'
    });

    return BookCollection;
});
