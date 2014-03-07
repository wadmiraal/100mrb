/**
 * @file
 * Rating widget view.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define( 'app/view/rating-widget', [
        'jquery',
        'underscore',
        'backbone',
        'app/global-data',
        'app/model/rating'
    ], function( $, _, Backbone, globals, RatingModel ) {
    'use strict';

    var RatingWidgetView = Backbone.View.extend({
        'class': 'book-read-widget',
        tpl: _.template( $( '#rating-widget-template' ).html() ),
        events: {
            'click .rating-overlay': 'rate', // @todo only for user rating widget  
            'mousemove .rating-overlay': 'mouseOver', // @todo only for user rating widget  
            'mouseout .rating-overlay': 'mouseOut' // @todo only for user rating widget  
        },
        initialize: function( options ) {
            if ( this.model === undefined ) {
                throw new Error( 'A BookModel instance must be provided to the RatingWidgetView.' );
            }

            var userId = options.userId !== undefined ? options.userId :
                            ( globals.get( 'userId' ) !== null ? globals.get( 'userId' ) : undefined );
            console.log(options)
            if ( userId !== undefined ) {
                this.ratingModel = new RatingModel({
                    userId: userId,
                    bookId: this.model.get( 'id' )
                });
                this.ratingModel.fetch();
            }

            var that = this;
            this.model
                .bind( 'change', function() {
                    that.render();
                })
                .bind( 'destroy', function() {
                    that.remove();
                });

            if ( this.ratingModel !== undefined ) {
                this.ratingModel.bind( 'change', function() {
                    that.render();
                });
            }
        },
        render: function() {
            this.$el.empty();
            this.$el.html( this.tpl( { bookModel: this.model, userRating: this.ratingModel } ) );
        },
        rate: function( e ) {
            var perc = this.moveSpan( e );
            var $widget = this.$el.find( '.book-rating-widget' );
            var rating = this.getRatingInRange( perc );
            $widget.data( 'rating', rating );
            this.ratingModel.set( 'rating', rating ).save();
        },
        mouseOver: function( e ) {
            this.moveSpan( e );
        },
        mouseOut: function( e ) {
            var $widget = this.$el.find( '.book-rating-widget' );
            var perc = this.getRatingInPerc( $widget.data( 'rating' ) );
            $widget.find( '.rating-span' ).width( perc + '%' );
        },
        moveSpan: function( e ) {
            var $widget = this.$el.find( '.book-rating-widget' );
            var perc = this.getWidthInPerc( e.offsetX, $widget.width() );
            $widget.find( '.rating-span' ).width( perc + '%' );
            return perc;
        },
        getWidthInPerc: function( x, width ) {
            return Math.round( x * 100 / width );
        },
        getRatingInRange: function( perc ) {
            return Math.round( perc * 5 / 100 );
        },
        getRatingInPerc: function( rating ) {
            return Math.round( rating * 100 / 5 );
        }
    });

    return RatingWidgetView;
});
