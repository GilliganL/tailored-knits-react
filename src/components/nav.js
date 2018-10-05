import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './nav.css';

export class Nav extends React.Component {

    slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .replace(/[\s\W-]+/g, '-');
    }

    render() {

        // How to handle logout 'link'

         const navItems = this.props.navItems.map((item, index) =>
            <li key={index} className='nav-bar-item'>
                <Link to={`/${this.slugify(item)}`}>
                    {item}
                </Link>
            </li>
        );
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
