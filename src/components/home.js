import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom';

import Header from './header';
import Landing from './landing';
import Projects from './projects';
import SingleProject from './single-project';
import Account from './account';
import Footer from './footer';

function loggedIn() {
   return localStorage.authToken ? true : false;
}

function requireAuth(nextState, replace) {
    console.log('requireAuth');
    if(!loggedIn()) {
        replace({
            pathname: '/'
        })
    }
}


export default function Home() {

    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route exact path='/projects' component={Projects} onEnter={requireAuth}/>
                    <Route exact path='/account' component={Account} onEnter={requireAuth} />
                    <Route exact path='/projects/:projectId' component={SingleProject} onEnter={requireAuth} />
                    <Route path='/' component={Landing} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

