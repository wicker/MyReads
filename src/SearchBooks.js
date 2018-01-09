import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import Book from './Book.js'


class SearchBooks extends Component {

  static propTypes = {
    selectShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    bookResults: []
  }

  updateQuery = (query) => {

    this.setState({ query: query.replace(/^\s+|\s+$/g, '') })

		BooksAPI.search(query, 12).then((b) => {
			this.setState({bookResults: b })
		})

  }

  render() {

    const { query, bookResults } = this.state
    const { selectShelf } = this.props

    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">

            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event.target.value)}
              value={query}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

            { bookResults && bookResults.length !== 0
                ?  bookResults.length > 0
                    ? bookResults.map((book) =>
                      (<li key={book.id}><Book book={book} key={book.id} selectShelf={selectShelf}/></li>))
                    : <li>No results found. Try another search!</li>

                : <li>Start typing to search by author or title</li>
            }

          </ol>
        </div>
      </div>

    )
  }
}

export default SearchBooks
