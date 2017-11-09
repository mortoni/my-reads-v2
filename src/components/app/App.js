import React, { Component } from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Grid from '../grid/Grid'
import Search from '../search/Search'
import * as Please from '../../api/BooksAPI'
import createHistory from 'history/createBrowserHistory'
import logo from '../../assets/udacity.svg'

const history = createHistory();

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            isLoading: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            Please.getAll().then((books) => {
                this.setState({
                    books,
                    isLoading: false
                 })
            })
        }, 2000);
    }

    updateBook = (book, shelf) => {
        Please.update(book, shelf).then(() => {
            book.shelf = shelf
            this.setState(state => ({
                books: state.books.filter((b) => b.id !== book.id).concat([ book ])
            }))
        })
    }

    render() {
        return (
            <div className="app">
                {this.state.isLoading

                    ?

                    <div className="loader">
                        <div className="d-flex h-100">
                            <div className="align-self-center mx-auto text-center">
                                <div className="col-12">
                                    <img src={ logo }
                                         alt="Udacity logo"
                                         className="logo"
                                         height="42" width="42"/>
                                </div>

                                <div className="row text-uppercase mt-2">
                                    <span className="col-12 title">My Reads</span>
                                    <span className="col sub-title">@Alan Mortoni</span>
                                </div>

                                <PulseLoader color={'#f95c3c'} />
                            </div>
                        </div>
                    </div>

                    :

                    <div>
                        <Header />

                            <Router history={history}>
                                <Switch>
                                    <Route exact path='/' render={() => (
                                        <Grid
                                            books={ this.state.books }
                                            onUpdateBook={ this.updateBook } />
                                    )}/>

                                    <Route path='/search' render={() => (
                                        <Search
                                            books={ this.state.books }
                                            onUpdateBook={ this.updateBook } />
                                    )}/>
                                </Switch>
                            </Router>

                        <Footer />
                    </div>
                }

            </div>

        );
    }
}

export default App;
