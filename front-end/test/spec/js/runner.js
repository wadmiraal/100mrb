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
        jasmine: '../../test/bower_components/jasmine/lib/jasmine-core/jasmine',
        'jasmine-html': '../../test/bower_components/jasmine/lib/jasmine-core/jasmine-html',
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
        },
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: [ 'jasmine' ],
            exports: 'jasmine'
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
        'spec/model/rating'
    ];

    require( specs, function() {
        jasmineEnv.execute();
    });
});
