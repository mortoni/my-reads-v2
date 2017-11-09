import React from 'react'
import { Shelves } from '../../util/Util'


const Book = (props) => {

    const { book, toggle, onUpdateBook, isSearch } = props

    return(
        <div className="col-6 col-sm-3 col-md-2">
            <div className="book">
                <div className="book-top">

                    { book.imageLinks && (
                        <div
                        onClick={ () => toggle(book) }
                        className="book-cover text-center"
                        style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}>
                            <div className="col tag">
                                { isSearch && book.shelf !== 'none' && (
                                    <span className="text-uppercase">
                                        { Shelves.map(shelf => {
                                            if(book.shelf === shelf.code) {
                                                return shelf.desc
                                            }
                                            return null
                                        })}
                                    </span>
                                )}
                            </div>

                        </div>
                    ) }
                    <div className="book-shelf-changer">
                        <select value={ book.shelf }
                                onChange={ (event) => onUpdateBook(book, event.target.value) }>

                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            { book.shelf !== 'none' && (
                                <option value="none">Remove</option>
                            )}

                        </select>
                    </div>
                </div>

                <div className="book-title">{book.title}</div>

                <div className="book-authors">

                    { book.authors && book.authors.map((author) => (
                        <div key={ author }>
                            <span>{ author }</span>
                        </div>
                    )) }

                </div>
            </div>
        </div>
    )
}

export default Book
