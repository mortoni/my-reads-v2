import React from 'react'
import Book from '../Book'

const Shelf = (props) => {
    const { books, shelf, toggle, onUpdateBook } = props

    return(
        <div className="shelf">
            <div className="col">
                <div className="row">
                    { books.filter(book => book.shelf === shelf.code)
                           .map(book => (
                               <Book key={ book.id }
                                     book={ book }
                                     toggle={ toggle }
                                     onUpdateBook={ onUpdateBook }/>
                           ))
                    }
                </div>
            </div>

        </div>
    )
}

export default Shelf
