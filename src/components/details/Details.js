import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import React from 'react'
import PropTypes from 'prop-types'

const Details = (props) => {

    const { modal, toggle, book } = props

    return (
        <div>
            { book && (
                <Modal isOpen={ modal } toggle={ () => toggle() }>
                    <ModalHeader toggle={ () => toggle() }>Book Details</ModalHeader>
                    <ModalBody>
                    <div className="col text-center">
                        <h2>{ book.title }</h2>
                    </div>

                    <div className="col text-center subtitle">
                        <span className="text-uppercase">{ book.subtitle }</span>
                    </div>

                    <div className="col text-center">
                        <p className="font-weight-bold"> { book.pageCount } pages</p>
                    </div>

                    <div className="col text-justify text ellipsis">
                        <span className="text-concat">{ book.description }</span>
                    </div>

                    </ModalBody>
                </Modal>
            )}
        </div>
    )
}

Details.PropTypes = {
    books: PropTypes.object.isRequired,
    modal: PropTypes.object.isRequired,
    toggle: PropTypes.func.isRequired
}

export default Details
