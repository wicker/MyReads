import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelectShelf from './SelectShelf'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    selectShelf: PropTypes.func.isRequired
  }

  render() {

    const { book, selectShelf } = this.props

    return (
      <li>
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
          <div className="book-title">{ book.title }</div>
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
