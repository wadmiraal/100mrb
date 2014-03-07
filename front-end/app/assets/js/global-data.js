/**
 * @file
 * This module contains all the global data, like user information.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define( 'app/global-data', [], function() {
    'use strict';

    var storage = {};

    return {
        set: function( key, value ) {
            storage[key] = value;
            return this;
        },
        get: function( key ) {
            return storage[key] !== undefined ? storage[key] : null;
        }
    };
});
