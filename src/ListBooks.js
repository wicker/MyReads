import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

/* Displays all the books currently on all the shelves */
class ListBooks extends Component {

  /* Updates to the books and their shelves
   * can be passed up to the App class
   * through these props */
  static propTypes = {
    books: PropTypes.array.isRequired,
    selectShelf: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired
  }

  render() {

    const { books, selectShelf, shelves } = this.props

    return (

      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>

            {shelves.map((shelf) =>
              (<BookShelf books={books} shelf={shelf} shelves={shelves}
                          key={shelf.funcName} selectShelf={selectShelf}/>)
            )}

          </div>

          <div className="open-search">
            <Link to='/search'>Search</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooks
