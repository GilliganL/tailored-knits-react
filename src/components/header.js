import React from 'react';
import {withRouter} from 'react-router';

import Nav from './nav';

export class Header extends React.Component {
   
render() {
    let content;
//set content based on page location. Move to Reducer?
    if(!this.props.params) {
    content = 
    }

    return (
        <header>
            <Nav />
                {content}
        </header>
    );
}
}

export default withRouter(Header);