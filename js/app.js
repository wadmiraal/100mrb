const BOOK_READ_CLASS = "book--read";
const BOOK_JS_ENABLED = "book--enhanced";
const BOOKS_HIDE_READ = "books--only-show-unread";

// Fetch data from local storage, init state.
for ( let i = window.localStorage.length - 1; i >= 0; i-- ) {
  const bookId = window.localStorage.key( i );
  const isRead = window.localStorage.getItem( bookId );
  changeState( document.getElementById( bookId ), isRead === "true" );
}

// Check/uncheck logic.
document.querySelectorAll( "li.book" ).forEach((el) => {
  const input = el.querySelector( "input[type=checkbox]" );

  el.classList.add( BOOK_JS_ENABLED );

  el.addEventListener( "click", ( e ) => {
    if ( e.target !== input ) {
      input.checked = !input.checked;
    }
    changeState( el, input.checked );
  });

});

// Show/hide read books.
const list = document.getElementById( "books" );
document.getElementById( "show-unread-only" ).addEventListener( "change", () => {
  list.classList.toggle( BOOKS_HIDE_READ );
});



function changeState( el, read ) {
  if ( read ) {
    el.classList.add( BOOK_READ_CLASS );
  } else {
    el.classList.remove( BOOK_READ_CLASS );
  }

  const input = el.querySelector( "input[type=checkbox]" );
  if ( input.checked !== read ) {
    input.checked = read;
  }

  window.localStorage.setItem( el.id, String( read ) );
}
