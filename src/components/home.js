import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom';

import Landing from './landing';
import Projects from './projects';

export default function Home() {

    return (
        <Router>
            <Switch>
                <Route path='/' component={Landing} />
                <Route exact path='/projects' component={Projects} />    
                {/* <Route exact path='/projects/:projectId' component={SingleProject} />
                <Route exact path='/account' component={Account} /> */}

                {/* if logged in <Redirect exact from='/' to='/projects' />
                            if not logged in redirect to '/'?
                         
                                   */}
            </Switch>
           
        </Router>
    );

}

