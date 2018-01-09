import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'


class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    selectShelf: PropTypes.func.isRequired
  }

  render() {

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

            <BookShelf books={books} shelf={shelves[0]} key={shelves[0].funcName} selectShelf={selectShelf}/>
            <BookShelf books={books} shelf={shelves[1]} key={shelves[1].funcName} selectShelf={selectShelf}/>
            <BookShelf books={books} shelf={shelves[2]} key={shelves[2].funcName} selectShelf={selectShelf}/>

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
