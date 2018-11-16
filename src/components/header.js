import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { DEMO_PASSWORD } from '../config';
import { login } from '../actions/auth';
import { headerActive } from '../actions/tailored-knits';
import Nav from './nav';

import './header.css';

export class Header extends React.Component {

    onClick() {
        this.props.dispatch(headerActive())
    }

    login() {
        const username = 'Kermit';
        this.props.dispatch(login(username, DEMO_PASSWORD))
    }

    render() {
        let content;
        let headerClass;
        if (!this.props.loggedIn) {
            headerClass = 'landing-header'
            content = <div>
                <img id='header-image' src='https://s3-us-west-1.amazonaws.com/tailored-knits-repository/heading-image.jpg' alt='Three knit sweaters' />
                <div className='main-content'>
                    <ul className='link-list'>
                        <li><a className='landing-link' href={`/#measurements`}>Measurements</a></li>
                        <li><a className='landing-link' href={`/#specifications`}>Specifications</a></li>
                        <li><a className='landing-link' href={`/#modifications`}>Modifications</a></li>
                        <li><a className='landing-link' href={`/#account`}>Account</a></li>
                    </ul>
                    <h1 id='main-title'>Tailored Knits</h1>
                    <p>Modify sweater patterns for a personalized fit with the help of Tailored Knits.</p>
                    <button id='demo-button' onClick={() => this.login()}>View Demo</button>
                </div>
            </div>
        } else {
            content = (
                <div id='menu-container' className={this.props.active} onClick={() => this.onClick()}>
                    <div id='bar-1' className={this.props.active}></div>
                    <div id='bar-2' className={this.props.active}></div>
                    <div id='bar-3' className={this.props.active}></div>
                </div>
            )
        }

        return (
            <header className={this.props.active + ' ' + headerClass}>
                {content}
                <Nav />
            </header>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.authReducer.currentUser !== null,
    active: state.tailoredKnitsReducer.active
});

export default withRouter(connect(mapStateToProps)(Header));