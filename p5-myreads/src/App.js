import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    }).catch(console.log);
  }

  selectBook = (book, value) => {
    BooksAPI.update(book, value).then(() => {
      let { books } = this.state;
      books = books.filter((b) => b.id !== book.id);
      if (value !== 'none') {
        books = books.concat({
        ...book,
        shelf: value
        });
      }
      this.setState({ books });
    }).catch(console.log);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route path="/search" render={() => (
            <SearchBooks
              booksOnShelf={this.state.books}
              onSelect={this.selectBook}
            />
          )}/>
          <Route exact path="/" render={() => (
            <ListBooks
              booksOnShelf={this.state.books}
              onSelect={this.selectBook}
            />
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
