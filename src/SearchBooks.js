import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import Book from './Book.js'

/* The query is handled internal to this component.
 *
 * The bookResults are passed back to the parent App
 * to update the top-level 'books' state.
 *
 * The search form updates results with every keystroke. */
class SearchBooks extends Component {

  static propTypes = {
    selectShelf: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired
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
    const { selectShelf, shelves } = this.props

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

            { /* There are three states to process:
               *
               * 1. No query has yet been entered
               *    so bookResults (and therefore)
               *    bookResults.length are undefined
               *
               *    -> displays 'Start typing...'
               *
               * 2. A query has been entered and
               *    legitimate results have been returned
               *    so the bookResults.length is > 0
               *
               *    -> displays book results
               *
               * 3. A query has been entered and
               *    there were no results found so
               *    bookResults exists but
               *    bookResults.length is 0
               *
               *    -> displays 'No result found...'
               *
               * */ }
            { bookResults && bookResults.length !== 0
                ?  bookResults.length > 0
                    ? bookResults.map((book) =>
                      (<Book book={book} key={book.id}
                             shelves={shelves}
                             selectShelf={selectShelf}/>))
                    : <div>No results found. Try another search!</div>

                : <div>Start typing to search by author or title</div>
            }

          </ol>
        </div>
      </div>

    )
  }
}

export default SearchBooks
