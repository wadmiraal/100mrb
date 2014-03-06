/**
 * @file
 * Defines the rating widget.
 *
 * 
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define( 'app/widget/rating', [
        'jquery',
        'app/model/rating',
        'app/model/book',
        'app/view/rating-widget'
    ], function( $, RatingModel, BookModel, RatingWidgetView ) {
    'use strict';

    $.fn.ratingWidget = function( settings ) {
        settings = settings || {};

        if ( settings.bookModel === undefined ) {
            if ( settings.bookId !== undefined ) {
                settings.bookModel = new BookModel({ id: settings.bookId });
            } else {
                throw new Error( 'The rating widget requires a BookModel or a book ID.' );
            }
        }

        if ( settings.ratingModel === undefined ) {
            if ( settings.userId !== undefined && settings.bookId !== undefined ) {
                settings.ratingModel = new RatingModel({
                    userId: settings.userId,
                    bookId: settings.bookId
                });
            }
        }
        
        var ratingView = new RatingWidgetView({ model: settings.bookModel });
        ratingView.render();
        $( this ).append( ratingView.$el );
    };

    return $.fn.ratingWidget;
});
