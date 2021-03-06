import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

/* Each BookShelf component accepts as properties
 * the entire array of books on all shelves
 * and the particular information for our desired
 * shelf.
 *
 * This component filters the 'books' array based
 * on the desired shelf information and renders
 * only the appropriate books. */

const BookShelf = ({books, shelf, selectShelf, shelves}) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{ shelf.title }</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.filter((book) =>
            (book.shelf === shelf.funcName))
                .map((book) =>
            (<Book book={book} key={book.id}
                   shelves={shelves} selectShelf={selectShelf}/>))
          }
        </ol>
      </div>
    </div>
  )
}

BookShelf.PropTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.object.isRequired,
  selectShelf: PropTypes.func.isRequired,
  shelves: PropTypes.array.isRequired
}

export default BookShelf
