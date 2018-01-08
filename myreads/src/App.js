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
          <option value="none">Remove Book</option>
        </select>
      </div>
    )
  }
}

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render() {

    const { book } = this.props

    return (
      <div key={ book.key }>
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

class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.object.isRequired
  }

  render() {

    const { books, shelf } = this.props
    var booksOnThisShelf

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelf.title }</h2>
        <div className="bookshelf-books">

          {books.filter((book) =>
            (book.shelf == shelf.funcName))
                .map((book) =>
            (<Book book={book}/>))
          }

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

    const shelves = [{ title: "Currently Reading",
                       funcName: "currentlyReading" },
                     { title: "Want To Read",
                       funcName: "wantToRead" },
                     { title: "Read",
                       funcName: "alreadyFinished" }]

    const { books } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>

            <BookShelf books={books} shelf={shelves[0]}/>
            <BookShelf books={books} shelf={shelves[1]}/>
            <BookShelf books={books} shelf={shelves[2]}/>

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
        "key":1,
        "title": "To Kill a Mockingbird",
        "authors": "Harper Lee",
        "width": 128,
        "height": 193,
        "backgroundImage": "./icons/tokill.png",
        "shelf":"currentlyReading",
      },
      {
        "key":2,
        "title": "Ender's Game",
        "authors": "Orson Scott Card",
        "width": "128",
        "height": "188",
        "backgroundImage": "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
        "shelf":"wantToRead",
      },
      {
        "key":3,
        "title": "Fine Prey",
        "authors": "Scott Westerfeld",
        "width": "128",
        "height": "188",
        "backgroundImage": "https://s17-us2.ixquick.com/cgi-bin/serveimage?url=https%3A%2F%2Fi.gr-assets.com%2Fimages%2FS%2Fcompressed.photo.goodreads.com%2Fbooks%2F1389237043i%2F186105._UY630_SR1200%2C630_.jpg&sp=784db9a71f3057c57adb4d40f34db473",
        "shelf":"alreadyFinished",
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
