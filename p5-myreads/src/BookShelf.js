import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={book.id}>
                <Book
                  data={book}
                  key={book.id}
                  onSelect={this.props.onSelect}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
