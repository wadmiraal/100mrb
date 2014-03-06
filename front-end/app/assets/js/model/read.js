/**
 * @file
 * Read model
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define( 'app/model/read', [ 'backbone' ], function( Backbone ) {
    'use strict';

    var ReadModel = Backbone.Model.extend({
        default: {
            read: 0
        }
    });

    return ReadModel;
});
