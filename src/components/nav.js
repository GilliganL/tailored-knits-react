import React from 'react';
import { connect } from 'react-redux';

import './nav.css';

export function Nav(props) {

    //use props to create Nav list
    //when on home page only 'View Demo'

    const navItems = props.navItems.map((item, index) => 
        <li key={index}>
            {item}
        </li>
    );

    return (
        <nav>
            <ul>
                {navItems}
            </ul>
        </nav>
    );
}

const mapPropsToState = state => ({
    navItems: state.navItems
});

export default connect(mapPropsToState)(Nav);
