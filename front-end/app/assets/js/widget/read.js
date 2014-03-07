/**
 * @file
 * Defines the read widget.
 *
 * 
 *
 * @author Wouter Admiraal <wad@wadmiraal.net>
 * @license MIT
 */

define( 'app/widget/read', [
        'jquery',
        'app/model/read',
        'app/model/book',
        'app/view/read-widget'
    ], function( $, ReadModel, BookModel, ReadWidgetView ) {
    'use strict';

    $.fn.readWidget = function( settings ) {
        settings = settings || {};

        if ( settings.bookModel === undefined ) {
            if ( settings.bookId !== undefined ) {
                settings.bookModel = new BookModel({ id: settings.bookId });
                settings.bookModel.fetch();
            } else {
                throw new Error( 'The rating widget requires a BookModel or a book ID.' );
            }
        }

        if ( settings.readModel === undefined ) {
            var userId = settings.userId !== undefined ? settings.userId : undefined;
            var bookId = settings.bookId !== undefined ? settings.bookId : settings.bookModel.get( 'id' );
            
            if ( userId !== undefined && bookId !== undefined ) {
                settings.ratingModel = new ReadModel({
                    userId: userId,
                    bookId: bookId
                });
            }
        }
        
        var readView = new ReadWidgetView({ model: settings.bookModel });
        readView.render();
        $( this ).append( readView.$el );
    };

    return $.fn.readWidget;
});
