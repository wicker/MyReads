import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectShelf from './SelectShelf'

/* Display an individual book based on the 'book' object
 * which should include the following:
 *
 * - book.id
 * - book.imageLinks.smallThumbnail
 * - book.infoLink
 * - book.authors
 * - book.title
 *
 * Note: the cover image thumbnail width and height are
 * hard-coded here.
 *
 * The Book component should gracefully render a book
 * object that may be missing an attribute or have
 * duplicate attributes.
 * */
class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    selectShelf: PropTypes.func.isRequired
  }

  render() {

    const { book, selectShelf } = this.props

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">

            { book.imageLinks && book.imageLinks.smallThumbnail
              ? ''
              : book.imageLinks = ''
            }

            { book.infoLink
              ? <a href={book.infoLink} target="_blank">
                <div className="book-cover" style={{ width: '128px',
                      height: '192px',
                      backgroundImage: `url(${ book.imageLinks.smallThumbnail })` }}></div>
                </a>
              : <div className="book-cover" style={{ width: '128px',
                      height: '192px',
                      backgroundImage: `url(${ book.imageLinks.smallThumbnail })` }}></div>
            }

            <SelectShelf book={book} selectShelf={selectShelf} />

          </div>
          <div className="book-title">
            { book.title ? book.title : '' }</div>
          <div className="book-authors">
            { book.authors && book.authors.length > 1
              ? book.authors.map((author) => <p key={ author }>{author}</p>)
              :  book.authors  }
          </div>


        </div>
      </li>
    )
  }
}

export default Book
