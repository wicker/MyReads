import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css';

/* Maintains the list of books currently assigned to our shelves */
class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /* This function updates the state of our shelved books */
  selectShelf = (bookToUpdate, selectedShelf) => {
    BooksAPI.update(bookToUpdate, selectedShelf).then(response => {
      bookToUpdate.shelf = selectedShelf

      const booksToUpdate =
        this.state.books.filter( book => book.id !== bookToUpdate.id)
      booksToUpdate.push(bookToUpdate)

      this.setState({ books: booksToUpdate })

    })
  }

  /* The Switch statement is an if/else
   * so there's no need for an exact match */
  render() {

    /* To add a shelf to the project, add an object to the
     * 'shelves' array and it will be made available to the
     * child components */
    const shelves = [{ title: "Currently Reading",
                       funcName: "currentlyReading" },
                     { title: "Want To Read",
                       funcName: "wantToRead" },
                     { title: "Read",
                       funcName: "read" }]
    return (
      <div>
        <Switch>
          <Route path='/search' render={({ history }) => (
            <SearchBooks
              books={ this.state.books }
              selectShelf={ this.selectShelf }
              shelves={ shelves }
            />

          )}/>
          <Route path="/" render={() => (
            <ListBooks
              books={ this.state.books }
              selectShelf={ this.selectShelf }
              shelves={ shelves }
            />
          )}/>
        </Switch>
      </div>
    );
  }
}

export default App;
