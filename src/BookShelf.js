import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.object.isRequired,
    selectShelf: PropTypes.func.isRequired
  }

  render() {

    const { books, shelf, selectShelf } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelf.title }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter((book) =>
                (book.shelf === shelf.funcName))
                    .map((book) =>
                (<Book book={book} key={book.id} selectShelf={selectShelf}/>))
              }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
