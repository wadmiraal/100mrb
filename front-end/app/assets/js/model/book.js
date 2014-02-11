/**
 * @file
 * Book model.
 *
 * Data and information about one book.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define([ 'backbone', 'backbone-associations', 'app/collection/ratings' ], function( Backbone, a, RatingCollection ) {
    'use strict';

    var BookModel = Backbone.AssociatedModel.extend({
        urlRoot: '/book',
        relations: [{
            type: Backbone.Many,
            key: 'ratings',
            collectionType: RatingCollection
        }],
        initialize: function( attributes, options ) {
            if ( attributes && attributes.id ) {
                this.set( 'ratings', new RatingCollection( [], { bookId: attributes.id } ) );
            }
        },
        fetch: function() {
            Backbone.AssociatedModel.prototype.fetch.apply( this, arguments );

            if ( this.get( 'ratings' ) ) {
                this.get( 'ratings' ).fetch();
            }
        },
        rating: function() {
            var count = 0,
                total = 0;

            if ( this.get( 'ratings' ) ) {
                this.get( 'ratings' ).each(function( rating ) {
                    total += parseFloat( rating.get( 'rating' ) );
                    count++;
                });
            }

            if ( count ) {
                return total / count;
            } else {
                return 0;
            }
        }
    });

    return BookModel;
});
