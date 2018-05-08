import React from 'react'

class Book extends React.Component {
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193,
            backgroundImage: `url(${this.props.book.imageLinks.smallThumbnail})` }}>
          </div>
          <div className="book-shelf-changer">
            <select
              value={this.props.book.shelf}
              onChange={(event) => this.props.click(this.props.book, event.target.value)} >
              <option value="none" disabled>移动到...</option>
              <option value="currentlyReading">在读</option>
              <option value="wantToRead">想读</option>
              <option value="read">已读</option>
              <option value="none">删除</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        {this.props.book.authors.map((author) => (
          <div className="book-authors" key={author}>{author}</div>
        ))}
      </div>
    )
  }
}

export default Book
