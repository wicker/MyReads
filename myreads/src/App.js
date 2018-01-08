import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css';
import PropTypes from 'prop-types'

class SelectShelf extends Component {

  render() {
    return (
      <div className="book-shelf-changer">
        <select>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

class Book extends Component {

  static propTypes = {
    book: PropTypes.array.isRequired
  }

  render() {

    const { book } = this.props

    return (
        <div>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: `${ book.width }`,
                                                   height: `${ book.height }`,
                                                   backgroundImage: `url(${ book.backgroundImage })` }}></div>
              <SelectShelf />
            </div>
            <div className="book-title">{ book.title }</div>
            <div className="book-authors">{ book.authors }</div>
          </div>
        </div>
      )

  }

}

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {

    const { books } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>

            {books.map((book) => (
              <Book book={book}/>
            ))}
          </div>

            <Link className='open-search' to='/search'>Search</Link>
        </div>
      </div>
    )
  }
}

class SearchBooks extends Component {
  render() {
    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>


    )
  }
}

class App extends Component {

  state = {
    books: [
      {
        "title": "To Kill a Mockingbird",
        "authors": "Harper Lee",
        "width": 128,
        "height": 193,
        "backgroundImage": "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
      },
      {
        "title": "Ender's Game",
        "authors": "Orson Scott Card",
        "width": "128",
        "height": "188",
        "backgroundImage": "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api"
      }
    ]
  }

  render() {
    return (
      <div>
        <Route path="/" exact render={() => (
          <ListBooks
            books={this.state.books}
          />
        )}/>

        <Route path='/search' render={({ history }) => (
          <SearchBooks />
        )}/>
      </div>
    );
  }
}

export default App;
