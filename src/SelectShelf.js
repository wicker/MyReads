import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SelectShelf extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    selectShelf: PropTypes.func.isRequired
  }

  render() {

    const { book, selectShelf } = this.props

    return (
      <div className="book-shelf-changer">
        <select id="shelf" value={ book.shelf ? '' : book.shelf = "none"}
          onChange={(e) => selectShelf(book, e.target.value)}>

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
