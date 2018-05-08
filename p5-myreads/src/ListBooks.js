import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

const shelfs = [
  {
    id: 'currentlyReading',
    title: '在读',
  },
  {
    id: 'wantToRead',
    title: '想读',
  },
  {
    id: 'read',
    title: '已读',
  },
]

class ListBooks extends React.Component {
  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfs.map((shelfData) => (
              <BookShelf
                key={shelfData.id}
                title={shelfData.title}
                books={this.props.booksOnShelf.filter(({ shelf }) => (shelf === shelfData.id))}
                onSelect={this.props.onSelect}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}



export default ListBooks
