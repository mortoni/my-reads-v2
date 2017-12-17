import React, { PureComponent } from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import { If, Then, Else } from 'react-if'
import Header from '../Header'
import Footer from '../Footer'
import Grid from '../Grid'
import Search from '../Search'
import * as Please from '../../api'
import createHistory from 'history/createBrowserHistory'
import Loader from './Loader'

const history = createHistory();

class App extends PureComponent {

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
                <If condition={ this.state.isLoading }>
                    <Then>
                        <Loader />
                    </Then>

                    <Else>
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
                    </Else>
                </If>
            </div>
        )
    }
}

export default App;
