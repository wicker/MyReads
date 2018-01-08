import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css';
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class SelectShelf extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired
  }

  render() {

    const { book } = this.props

    return (
      <div className="book-shelf-changer">
        <select id="shelf" value={ book.shelf }
          onChange={(event) => book.setState({shelf: event.target.value})}
        >
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
    book: PropTypes.object.isRequired,
    selectShelf: PropTypes.func.isRequired
  }

  render() {

    const { book, selectShelf } = this.props

    return (
      <div key={ book.key }>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: `${ book.width }`,
                                                 height: `${ book.height }`,
                                                 backgroundImage: `url(${ book.backgroundImage })` }}></div>
          <div className="book-shelf-changer">
            <select id="shelf" value={ book.shelf }
              onChange={(e) => selectShelf(book, e.target.value)}>

              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">Remove Book</option>

            </select>
          </div>
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
    shelf: PropTypes.object.isRequired,
    selectShelf: PropTypes.func.isRequired
  }

  render() {

    const { books, shelf, selectShelf } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelf.title }</h2>
        <div className="bookshelf-books">

          {books.filter((book) =>
            (book.shelf == shelf.funcName))
                .map((book) =>
            (<Book book={book} selectShelf={selectShelf}/>))
          }

        </div>
      </div>
    )
  }
}

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

            <BookShelf books={books} shelf={shelves[0]} selectShelf={selectShelf}/>
            <BookShelf books={books} shelf={shelves[1]} selectShelf={selectShelf}/>
            <BookShelf books={books} shelf={shelves[2]} selectShelf={selectShelf}/>

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
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }


  selectShelf(bookToUpdate, selectedShelf) {
    BooksAPI.update(bookToUpdate, selectedShelf).then(bookToUpdate => {
      bookToUpdate.shelf = selectedShelf
      this.setState(state => ({
        books: state.books.concat([ bookToUpdate  ])
      }))
    })
  }

  render() {

    return (
      <div>
        <Route path="/" exact render={() => (
          <ListBooks
            books={ this.state.books }
            selectShelf={ this.selectShelf }
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
