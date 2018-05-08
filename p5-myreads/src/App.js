import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */

    books: [],
    tmp: []
  }

  componentDidMount() {
    //向 BooksAPI 异步获取数据
    BooksAPI.getAll().then((books) => {this.setState({ books })})
  }

  change(book, shelf) {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState({ books })
      })
    })

  }

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to={'/'}>Close</Link>
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
        )}
        />
        <Route exact path='/' render={() => (
          <div className="list-books">
            {JSON.stringify(this.state.tmp)}
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                  title={'在读'}
                  click={this.change.bind(this)} />
                <BookShelf
                  books={this.state.books.filter((book) => book.shelf === 'wantToRead')}
                  title={'想读'}
                  click={this.change.bind(this)} />
                <BookShelf
                  books={this.state.books.filter((book) => book.shelf === 'read')}
                  title={'已读'}
                  click={this.change.bind(this)} />
              </div>
            </div>
            <div className="open-search">
              <Link to={'/search'}>Add a book</Link>
            </div>
          </div>
        )}
        />
      </div>
    )
  }
}

export default BooksApp
