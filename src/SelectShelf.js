import React, { Component } from 'react'
import PropTypes from 'prop-types'

/* This form allows a user to change the shelf
 * of a book object. It passes the new shelf
 * information back up to its parent. */
class SelectShelf extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    selectShelf: PropTypes.func.isRequired
  }

  render() {

    const { book, selectShelf } = this.props

    return (
      <div className="book-shelf-changer">

      {/* If a book is already in our library with a shelf
         * assigned, we should inherit that and start out with
         * that selection highlighted.
         * If a book is not already in our library and has no
         * shelf assigned, assign it to "none" so all of the
         * possible shelf options are available to be selected */}
        <select id="shelf"
          value={ book.shelf ? book.shelf : book.shelf = "none"}
          onChange={(e) => selectShelf(book, e.target.value)}
        >

        {/* See notes in ListBooks.js
          * TODO: Refactor these components to all
          * depend dynamically on 'shelves' */}
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">Remove Book</option>

        </select>
      </div>
    )
  }
}

export default SelectShelf
