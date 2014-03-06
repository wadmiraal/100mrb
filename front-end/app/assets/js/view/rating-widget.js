/**
 * @file
 * Rating widget view.
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define( 'app/view/rating-widget', [ 'jquery', 'underscore', 'backbone', 'app/model/rating' ], function( $, _, Backbone, RatingModel ) {
    'use strict';

    var RatingWidgetView = Backbone.View.extend({
        'class': 'book-read-widget',
        tpl: _.template( $( '#rating-widget-template' ).html() ),
        initialize: function( options ) {
            if ( this.model === undefined ) {
                throw new Error( 'A BookModel instance must be provided to the RatingWidgetView.' );
            }

            if ( options.userId !== undefined ) {
                this.ratingModel = new RatingModel({
                    userId: options.userId,
                    bookId: this.model.get('id')
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
        }
    });

    return RatingWidgetView;
});
