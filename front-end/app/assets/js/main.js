/**
 * @file
 * Application initializer.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

 // RequireJS configuration.
require.config({
    paths: {
        jquery: 'components/jquery/jquery',
        underscore: 'components/underscore/underscore',
        backbone: 'components/backbone/backbone'
    }
});

// Require the application, and start it.
require([ 'app' ], function( App ) {
    'use strict';

    App.initialize();
});
