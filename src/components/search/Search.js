import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import { Debounce } from 'react-throttle'
import * as Please from '../../api/BooksAPI'
import Details from '../details/Details'
import Book from '../book/Book'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            foundBooks: [],
            modal: false,
            selectedBook: {}
        }
    }

    toggleModal = (selectedBook) => {
        this.setState({
            modal: !this.state.modal,
            selectedBook
        });
    }

    /* merge searched books with user's book */
    mergeBooks = (books) => {
         return books.map((book) => {
            const found = this.props.books.find(b => b.id === book.id)
            if(found) {
                book.shelf = found.shelf
            } else {
                book.shelf = 'none'
            }
          return book
        })
    }

    searchBook = () => {
        Please.search(this.state.query, 20).then((books) => {
            if(Array.isArray(books)) {
                this.setState({
                    foundBooks: this.mergeBooks(books)
                })
            } else {
                this.setState({ foundBooks: [] })
            }
        })
    }

    updateQuery = (query) => {
        this.setState({ query },
            () => {
                if(query.length > 0) {
                    this.searchBook()
                }
            }
        )
    }

    render() {
        const { query, foundBooks, modal, selectedBook } = this.state

        return (
            <div className="container">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
                    <div className="search-books-input-wrapper">

                    <Debounce time="400" handler="onChange">
                        <input type="text"
                               placeholder="Search by title or author"
                               onChange={(e) => this.updateQuery(e.target.value)}/>
                    </Debounce>

                    </div>

                    <div className="text-center d-flex found">
                        { query.length > 0 && foundBooks.length === 0 && (
                            <HashLoader
                              color={'#f95c3c'}
                              loading={this.state.loading}
                            />
                        )}

                        { foundBooks.length > 0 && (
                            <span className="align-self-center">
                                { foundBooks.length } Books
                            </span>
                        )}
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        { foundBooks.map((book) => (
                            <li key={ book.id }>
                                <Book book={ book }
                                      onUpdateBook={ this.props.onUpdateBook }
                                      toggle={ this.toggleModal }
                                      isSearch={ true }
                                />
                            </li>
                        ))}
                    </ol>
                </div>

                <Details modal={ modal }
                         toggle={ this.toggleModal }
                         book={ selectedBook }/>
            </div>
        )
    }
}

export default Search
