import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { HashLoader } from 'react-spinners'
import { Debounce } from 'react-throttle'
import { If, Then } from 'react-if'
import * as Please from '../../api'
import Details from '../Details'
import Book from '../Book'

class Search extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            foundBooks: [],
            modal: false,
            selectedBook: {},
            loading: false
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
            return found ? found : book
        })
    }

    searchBook = () => {
        this.setState({ loading: true })
        Please.search(this.state.query, 20).then((books) => {
            if(!books.error) {
                this.setState({
                    foundBooks: this.mergeBooks(books)
                })
            } else {
                this.setState({ foundBooks: [] })
            }

            this.setState({ loading: false })
        })
    }

    updateQuery = (query) => {
        this.setState({ query },
            () => {
                this.setState({ foundBooks: [] })
                if(query.length > 0) {
                    this.searchBook()
                }
            }
        )
    }

    render() {
        const { query, foundBooks, modal, selectedBook, loading } = this.state

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
                        <If condition={ query.length > 0 && foundBooks.length === 0 }>
                            <Then>
                                <HashLoader
                                  color={'#f95c3c'}
                                  loading={ loading }
                                />
                            </Then>
                        </If>

                        <If condition={ foundBooks.length > 0 }>
                            <Then>
                                <span className="align-self-center text-result">
                                    { foundBooks.length } Books
                                </span>
                            </Then>
                        </If>

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
