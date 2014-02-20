/**
 * @file
 * Router file.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define( 'app/router/router', [
    'backbone',
    'app/collection/books',
    'app/view/books'
], function( Backbone ) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'books': 'books',
            'book/:id': 'book',
            'user': 'user',
            'user/edit': 'user-edit',
            'user/login': 'user-login',
            'user/register': 'user-register',
            'user/forgot-pass': 'user-forgot-pass'
        }
    });

    return Router;
});
