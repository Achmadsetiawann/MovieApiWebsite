// Module
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Element
import Header from '../elements/Header/Header';
import NotFound from '../elements/NotFound/NotFound';
// Pages
import Home from '../Home/Home';
import Movie from '../Movie/Movie';

const App = () => {
    return (
        <BrowserRouter>
            
            <React.Fragment>
                <Header />
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/:movieId" component={Movie} exact />
                    <Route component={NotFound} />
                </Switch>
            </React.Fragment>

        </BrowserRouter>
    )
}

export default App;