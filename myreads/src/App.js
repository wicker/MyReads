import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

class ListBooks extends React.Component {
  render() {
    return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            <Link className='open-search' to='/search'>Search</Link>
					</div>
				</div>
      </div>
		)
  }
}

class SearchBooks extends React.Component {
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
