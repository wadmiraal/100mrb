/**
 * @file
 * Read widget view.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define( 'app/view/read-widget', [
        'jquery',
        'underscore',
        'backbone',
        'app/global-data',
        'app/model/read'
    ], function( $, _, Backbone, globals, ReadModel ) {
    'use strict';

    var ReadWidgetView = Backbone.View.extend({
        'class': 'book-read-widget',
        tpl: _.template( $( '#read-widget-template' ).html() ),
        events: {
            'click input[type="checkbox"]': 'flag'
        },
        initialize: function( options ) {
            if ( this.model === undefined ) {
                throw new Error( 'A BookModel instance must be provided to the ReadWidgetView.' );
            }

            var userId = options.userId !== undefined ? options.userId :
                            ( globals.get( 'userId' ) !== null ? globals.get( 'userId' ) : undefined );

            if ( userId !== undefined ) {
                this.readModel = new ReadModel({
                    userId: userId,
                    bookId: this.model.get( 'id' )
                });
                this.readModel.fetch();
            } else {
                return this;
            }

            var that = this;
            this.model
                .bind( 'change', function() {
                    that.render();
                })
                .bind( 'destroy', function() {
                    that.remove();
                });

            if ( this.readModel !== undefined ) {
                this.readModel.bind( 'change', function() {
                    that.render();
                });
            }
        },
        render: function() {
            this.$el.empty();
            this.$el.html( this.tpl( { bookModel: this.model, readModel: this.readModel } ) );
        },
        flag: function() {
            this.readModel.set( 'read', this.$el.find( 'input[type="checkbox"]' ).is( ':checked' ) );
            this.readModel.save();
        }
    });

    return ReadWidgetView;
});
