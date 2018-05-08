import React from 'react'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends React.Component {
  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  state = {
    queryResult: []
  }

  loading = false;

  updateQuery = (query) => {
    console.log(query);
    console.log(this.loading);
    if (query && !this.loading) {
      this.loading = true;
      BooksAPI.search(query, 20).then((result) => {
        this.loading = false;
        console.log(result);
        if (result && !result.error) {
          this.setState({ queryResult: result });
        } else {
          this.setState({ queryResult: [] });
        }
      }).catch((e) => {
        this.loading = false;
        this.setState({ queryResult: [] });
        console.log(e);
      });
    } else {
      this.setState({ queryResult: [] });
    }
  }

  render() {
    const { booksOnShelf, onSelect } = this.props;

    let showingBooks = this.state.queryResult;
    if (showingBooks) {
      showingBooks.forEach((showingBook) => {
        let bookFoundOnShelf = booksOnShelf.find((bookOnShelf) => (
          bookOnShelf.id === showingBook.id)
        );
        if (bookFoundOnShelf) {
          // 已经在架上的书，显示状态不变
          showingBook.shelf = bookFoundOnShelf.shelf;
          //console.log(showingBook);
        } else {
          showingBook.shelf = 'none';
        }
      });
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <Debounce time="500" handler="onChange">
              <input
                type="text"
                placeholder="搜索书名或作者（英文）"
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks && showingBooks.map((book) => (
              <li key={book.id}>
                <Book data={book} onSelect={onSelect}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
