# MyReads

This React app tracks books I've read, am reading, or want to read. It was created using [Create React App](https://github.com/facebookincubator/create-react-app) and uses files from Udacity's [reactnd-project-myreads-starter](https://github.com/udacity/reactnd-project-myreads-starter). It was the first project for the [Udacity React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019).

# Usage

Clone the repository.

```
git clone https://github.com/wicker/MyReads.git
```

Install project dependencies and start the dev server.

```
npm install
npm start
```

# Log

Created environment, grabbed newest node v9.3.0, set up local node. 

```
mkvirtualenv myreads
mkdir MyReads && cd MyReads
curl http://nodejs.org/dist/node-latest.tar.gz | tar xvz
cd node-v*
./configure --prefix=$VIRTUAL_ENV
make install
```

Get Webpack and everything else we need with

```
npm install -g create-react-app
```

Create the React MyReads app.

```
create-react-app myreads
```

Start the development server.

``` 
npm start
```

No need for a backend server, as we're working with the Udacity Books API. 

Looked at the hardcoded App.js in the starter app. It looks like this rough structure could meet our UI needs:

```
ListBooks
  Bookshelf
    Book
      SelectShelf
SearchBooks
  Book
    SelectShelf
```

The two routes in App.js can be:

```
('/') ListBooks
('/search') SearchBooks
```

The BooksAPI calls available are:

```
get(bookid)
getAll()
update(book, shelf)
search(query)
```

## Routes

First, set up routes and hardcode the existing results in ListBooks and SearchBooks.

Be able to go back and forth between the two. 

## Book Component

Create Book component but use a 'books' var to hardcode them, like in the ContactsApp example. 

## SelectShelf Component

Create SelectShelf Component with hardcoded UI. 

## BookShelf Component

Wrap Book and SelectShelf in Bookshelf Component, all hardcoded. No API calls yet. Make shelf easily extensible.

ListBooks should use local shelves and books vars to render the app the way it should look. 

## SearchBooks 

Use Book and SelectShelf to render results from a search call to the BooksAPI. Update search query on every letter, like in the ContactsApp. 

## Make Book dynamic

Not sure how to do this yet. Make the book dynamic, allow adding books to shelves, delete books from library (move to non-existent shelf?), update ListBooks appropriately. Seems like 'shelf' should be a state in Book. 
