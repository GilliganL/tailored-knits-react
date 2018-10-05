import React from 'react';
import { withRouter } from 'react-router';

import Nav from './nav';

export class Header extends React.Component {

    render() {
        let content;
        //set content based on page location. Move to Reducer?
        if (this.props.location.pathname === '/') {
            content = <div>
                <h1>Tailored Knits</h1>
                <p>Modify sweater patterns for a personalized fit with the help of Tailored Knits.</p>
                <button>View Demo</button>
            </div>
        } else {
            content = <Nav />
        }

        return (
            <header>
                {content}
            </header>
        );
    }
}

export default withRouter(Header);