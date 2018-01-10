import React, { Component } from 'react'
import PropTypes from 'prop-types'

/* This form allows a user to change the shelf
 * of a book object. It passes the new shelf
 * information back up to its parent. */
class SelectShelf extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    selectShelf: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired
  }

  render() {

    const { book, selectShelf, shelves } = this.props

    return (
      <div className="book-shelf-changer">

      {/* If a book is already in our library with a shelf
         * assigned, we should inherit that and start out with
         * that selection highlighted.
         *
         * If a book is not already in our library and has no
         * shelf assigned, assign it to "none" so all of the
         * possible shelf options are available to be selected */}
        <select id="shelf"
          value={ book.shelf ? book.shelf : book.shelf = "none"}
          onChange={(e) => selectShelf(book, e.target.value)}
        >

          <option value="none" disabled>Move to...</option>

          {/* Dynamically render the shelves */}
          {shelves.map((shelf) =>
            (<option key={shelf.funcName} value={shelf.funcName}>{shelf.title}</option>)
          )}

          {/* If the book shelf is already none, no need to include Remove option */}
          { book.shelf === "none" ? '' : <option value="none">Remove Book</option>  }
        </select>
      </div>
    )
  }
}

export default SelectShelf
