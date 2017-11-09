import React, { Component } from 'react'
import { TabContent,
         TabPane,
         Nav,
         NavItem,
         NavLink,
         Badge } from 'reactstrap'
import { Link } from 'react-router-dom'
import { Shelves } from '../../util/Util'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Shelf from '../shelf/Shelf'
import Details from '../details/Details'

class Grid extends Component {

    static PropTypes = {
        books: PropTypes.object.isRequired,
        onUpdateBook: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
          activeTab: Shelves[0].code,
          modal: false,
          selectedBook: {}
        };
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }

    toggleModal = (selectedBook) => {
        this.setState({
            modal: !this.state.modal,
            selectedBook
        });
    }

    render() {

        const { activeTab, modal, selectedBook } = this.state
        const { onUpdateBook, books } = this.props

        return(
            <div className="container">
                <Nav tabs>
                    { Shelves.map(shelf => (
                        <NavItem key={ shelf.code }>
                            <NavLink
                                className={classnames({ active: activeTab === shelf.code })}
                                onClick={() => { this.toggle(shelf.code); }} >
                                { shelf.desc }
                                <Badge className="badge">
                                    { books.filter(b => b.shelf === shelf.code).length }
                                </Badge>
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>

                { Shelves.map(shelf => (
                    <TabContent key={ shelf.code } activeTab={ activeTab }>
                        <TabPane tabId={ shelf.code }>
                            <Shelf shelf={ shelf }
                                   books={ books }
                                   onUpdateBook={ onUpdateBook }
                                   toggle={ this.toggleModal }/>
                        </TabPane>

                    </TabContent>
                ))}

                <Details modal={ modal }
                         toggle={ this.toggleModal }
                         book={selectedBook}/>

                <div className="open-search">
                    <Link className='close-create-contact' to='/search'>Add a book</Link>
                </div>

            </div>
        )
    }

}

export default Grid
