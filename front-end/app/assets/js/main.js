/**
 * @file
 * Application initializer.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

 // RequireJS configuration.
require.config({
    baseUrl: 'assets/',
    urlArgs: 'v=1.0.0',
    paths: {
        jquery: 'components/jquery/jquery',
        underscore: 'components/underscore/underscore',
        backbone: 'components/backbone/backbone',
        'backbone-associations': 'components/backbone-associations/backbone-associations',
        app: 'js/',
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        },
        'backbone-associations': {
            deps: [ 'backbone' ],
            exports: 'BackboneAssociations'
        }
    }
});

// Require the application, and start it.
require([ 'app/app' ], function( App ) {
    'use strict';

    App.initialize();
});
