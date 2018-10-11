import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { refreshAuthToken } from '../actions/auth';
import Header from './header';
import Landing from './landing';
import Projects from './projects';
import SingleProject from './single-project';
import Profile from './profile';
import Footer from './footer';

export class Home extends React.Component {

    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path='/projects' component={Projects} />
                        <Route exact path='/profile' component={Profile}  />
                        <Route exact path='/projects/:projectId' component={SingleProject}  />
                        <Route path='/' component={Landing} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Home);

