/**
 * @file
 * Spec runner.
 *
 * The runs all the Jasmine specs. It includes the configuration for
 * RequireJS, as to make our app scripts compatible.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

require.config({
    baseUrl: '../app/assets/',
    urlArgs: 'random=' + Math.random(),
    paths: {
        jquery: 'components/jquery/jquery',
        underscore: 'components/underscore/underscore',
        backbone: 'components/backbone/backbone',
        app: 'js',
        spec: '../../test/spec/js'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        }
    }
});

require([], function() {
    'use strict';

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter( htmlReporter );

    jasmineEnv.specFilter = function( spec ) {
        return htmlReporter.specFilter( spec );
    };

    var specs = [
        'spec/model/rating',
        'spec/collection/ratings'
    ];

    require( specs, function() {
        jasmineEnv.execute();
    });
});
