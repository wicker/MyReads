import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css';

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
