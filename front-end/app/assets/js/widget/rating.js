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
                settings.bookModel.fetch();
            } else {
                throw new Error( 'The rating widget requires a BookModel or a book ID.' );
            }
        }

        if ( settings.ratingModel === undefined ) {
            var userId = settings.userId !== undefined ? settings.userId : undefined;
            var bookId = settings.bookId !== undefined ? settings.bookId : settings.bookModel.get( 'id' );
            
            if ( userId !== undefined && bookId !== undefined ) {
                settings.ratingModel = new RatingModel({
                    userId: userId,
                    bookId: bookId
                });
            }
        }
        
        var ratingView = new RatingWidgetView({ model: settings.bookModel });
        ratingView.render();
        $( this ).append( ratingView.$el );
    };

    return $.fn.ratingWidget;
});
