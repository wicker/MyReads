import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

class ListBooks extends React.Component {
  render() {
    return 'List books'
  }
}

class SearchBooks extends React.Component {
  render() {
    return 'Search books'
  }
}

class App extends Component {

  state = {
    books: []
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
