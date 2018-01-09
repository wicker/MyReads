# MyReads

This React app tracks books I've read, am reading, or want to read. It was created using [Create React App](https://github.com/facebookincubator/create-react-app) and uses files from Udacity's [reactnd-project-myreads-starter](https://github.com/udacity/reactnd-project-myreads-starter). It's the first project for the [Udacity React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019).

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

# User Interface

The main page displays all books currently on the three shelves: 

```
Currently Reading
Want to Read
Read
```

A book can be moved from one shelf to another by clicking on the downward arrow icon on each book cover. The move is immediately reflected on the page. There is an additional option on the shelf selection menu to remove a book permanently; if clicked, the book will disappear.

Every displayed book shows a cover (if it exists), the authors (if there are any), and the title. Clicking on the cover image opens a new tab or window with the Google books page. 

New books can be added to one of the three shelves by clicking on the green '+' icon at the page's bottom right. This opens the search page.

On the search page, every keystroke updates the returned list of books. Each book contains the same meta information as the main page. Clicking on the downward icon opens the shelf selection menu and allows the user to assign the book to the appropriate shelf. 

The user can perform multiple searches and shelf assignments. When finished, the user can leave the search page by clicking on the backward arrow to the left of the search bar.

# Design Notes

The overall structure of the app 

```
ListBooks
  Bookshelf
    Book
      SelectShelf
SearchBooks
  Book
    SelectShelf
```

The use of Switch (available in Router 4) means we support two routes and redirect any other requested URLs back to the main page. 

```
('/') ListBooks
('/search') SearchBooks
```

The [BooksAPI](https://github.com/udacity/reactnd-project-myreads-starter/blob/master/src/BooksAPI.js) calls available are:

```
get(bookid)
getAll()
update(book, shelf)
search(query)
```

