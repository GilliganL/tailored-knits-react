import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuthToken } from '../local-storage';
import { clearAuth } from '../actions/auth';
import { headerActive } from '../actions/tailored-knits';

import './nav.css';

export class Nav extends React.Component {

    logOut() {
        this.props.dispatch(clearAuth());
        this.props.dispatch(headerActive());
        clearAuthToken();
    }

    onClick() {
        this.props.dispatch(headerActive())
    }

    slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .replace(/[\s\W-]+/g, '-');
    }

    render() {
         const navItems = this.props.navItems.map((item, index) => {
            if (item !== 'Logout') {
            return <li key={index} className='nav-bar-item'>
                <Link to={`/${this.slugify(item)}`} onClick={() => this.onClick()}>
                    {item}
                </Link>
            </li>
            } else {
                return <li key={index} className='nav-bar-item'>
                <Link to={`/`} onClick={() => this.logOut()}>
                    {item}
                </Link>
            </li>
            }
         });
        return(
            <nav>
                <ul>
                    {navItems}
                </ul>
            </nav >
        );
    }
}

const mapPropsToState = state => ({
    navItems: state.tailoredKnitsReducer.navItems
});

export default connect(mapPropsToState)(Nav);
