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
    selectShelf: PropTypes.func.isRequired
  }

  render() {

    /* Add a shelf to 'shelves' and manually display it
     * below by calling the BookShelf object.
     * You must also edit SelectShelf.js, which
     * is admittedly not at all ideal.
     *
     * TODO: Refactor these components to all
     * depend dynamically on 'shelves' */
    const shelves = [{ title: "Currently Reading",
                       funcName: "currentlyReading" },
                     { title: "Want To Read",
                       funcName: "wantToRead" },
                     { title: "Read",
                       funcName: "read" }]

    const { books, selectShelf } = this.props

    return (

      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>

          {/* See notes above
             * TODO: Refactor these components to all
             * depend dynamically on 'shelves' */}
            <BookShelf books={books} shelf={shelves[0]}
                       key={shelves[0].funcName} selectShelf={selectShelf}/>
            <BookShelf books={books} shelf={shelves[0]}
                       key={shelves[1].funcName} selectShelf={selectShelf}/>
            <BookShelf books={books} shelf={shelves[2]}
                       key={shelves[2].funcName} selectShelf={selectShelf}/>

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
