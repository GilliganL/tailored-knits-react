import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { headerActive } from '../actions/tailored-knits';
import Nav from './nav';

import './header.css';

export class Header extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         active: '',
    //         headerClass: ''
    //     }
    // }

    onClick() {
        // const headerClass = this.state.active ? '' : 'active';
        this.props.dispatch(headerActive())
    }

    render() {
        let content;
        if (!this.props.loggedIn) {
            content = <div>
                <h1>Tailored Knits</h1>
                <p>Modify sweater patterns for a personalized fit with the help of Tailored Knits.</p>
                <button id='demo-button'>View Demo</button>
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
            <header className={this.props.active}>
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