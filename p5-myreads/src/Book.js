import React from 'react'
import PropTypes from 'prop-types'


class Book extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128, height: 193,
              backgroundImage: (this.props.data.imageLinks && this.props.data.imageLinks.smallThumbnail ? (
              `url(${this.props.data.imageLinks.smallThumbnail})`) : ('')
          )}}>
          </div>
          <div className="book-shelf-changer">
            <select
              value={this.props.data.shelf || 'none'}
              onChange={(event) => (this.props.onSelect(this.props.data, event.target.value))}>
              <option value="none" disabled>移动到...</option>
              <option value="currentlyReading">在读</option>
              <option value="wantToRead">想读</option>
              <option value="read">已读</option>
              <option value="none">删除</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.data.title}</div>
        <div className="book-authors">{this.props.data.authors && this.props.data.authors.join(', ')}</div>
      </div>
    )
  }
}

export default Book
