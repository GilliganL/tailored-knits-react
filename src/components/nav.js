import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuthToken } from '../local-storage';
import { clearAuth } from '../actions/auth'

import './nav.css';

export class Nav extends React.Component {

    logOut() {
        this.props.dispatch(clearAuth())
        clearAuthToken();
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
                <Link to={`/${this.slugify(item)}`}>
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
    navItems: state.tailoredKnits.navItems
});

export default connect(mapPropsToState)(Nav);
