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
                    
                    <Route exact path='/projects' component={Projects} />
                    <Route exact path='/account' component={Account} />
                    <Route exact path='/projects/:projectId' component={SingleProject} />
                    <Route path='/' component={Landing} />
                    {/* if logged in <Redirect exact from='/' to='/projects' />
                            if not logged in redirect to '/'?
                         onEnter={requireAuth} add to routes requiring auth
                                   */}
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

