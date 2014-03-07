/**
 * @file
 * Specs for global data storage.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define([ 'app/global-data' ], function( globals ) {
    'use strict';

    describe( 'GLobal data storage', function() {

        describe( 'when loaded by RequireJS', function() {
            it( 'should exist', function() {
                expect( globals ).toBeDefined();
            });
        });

        describe( 'when getting an inexistent key', function() {
            it( 'it should return null', function() {
                expect( globals.get( 'key__' ) ).toBe( null );
            });
        });

        describe( 'when setting', function() {
            it( 'it should allow to retrieve the value again', function() {
                globals.set( 'key', 'value' );
                expect( globals.get( 'key' ) ).toEqual( 'value' );
            });

            it( 'it should override existing values', function() {
                globals.set( 'key', 'value' );
                expect( globals.get( 'key' ) ).toEqual( 'value' );
                globals.set( 'key', 'value2' );
                expect( globals.get( 'key' ) ).toEqual( 'value2' );
            });
        });
    });
});
