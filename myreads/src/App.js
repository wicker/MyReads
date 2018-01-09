import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css';
import * as BooksAPI from './BooksAPI'
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

            { book.imageLinks && book.imageLinks.smallThumbnail
              ? ''
              : book.imageLinks = ''
            }

            { book.infoLink
              ? <a href={book.infoLink}>
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
              ? book.authors.map((author) => <p>{author}</p>)
              :  book.authors  }
          </div>
          { console.log(book) }


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
            (book.shelf === shelf.funcName))
                .map((book) =>
            (<Book book={book} key={book.id} selectShelf={selectShelf}/>))
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

            <BookShelf books={books} shelf={shelves[0]} key={shelves[0].funcName} selectShelf={selectShelf}/>
            <BookShelf books={books} shelf={shelves[1]} key={shelves[1].funcName} selectShelf={selectShelf}/>
            <BookShelf books={books} shelf={shelves[2]} key={shelves[2].funcName} selectShelf={selectShelf}/>

          </div>

            <Link className='open-search' to='/search'><a>Search</a></Link>
        </div>
      </div>
    )
  }
}

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

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  selectShelf = (bookToUpdate, selectedShelf) => {
    BooksAPI.update(bookToUpdate, selectedShelf).then(response => {
      bookToUpdate.shelf = selectedShelf

      const booksToUpdate = this.state.books.filter( book => book.id !== bookToUpdate.id)
      booksToUpdate.push(bookToUpdate)

      this.setState({ books: booksToUpdate })

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
          <SearchBooks
            books={ this.state.books }
            selectShelf={ this.selectShelf }
          />

        )}/>
      </div>
    );
  }
}

export default App;
