import React from 'react';
import { withRouter } from 'react-router';

import Nav from './nav';

import './header.css';

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
            headerClass: ''
        }
    }

    onClick() {
        const headerClass = this.state.active ? '' : 'active';
        const active = this.state.active ? '' : 'active';
        this.setState({
            active,
            headerClass
        });
    }

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
            content = (
                <div id='menu-container' className={this.state.active} onClick={() => this.onClick()}>
                    <div id='bar-1' className={this.state.active}></div>
                    <div id='bar-2' className={this.state.active}></div>
                    <div id='bar-3' className={this.state.active}></div>
                </div>
            )
        }

        return (
            <header className={this.state.headerClass}>
                {content}
                <Nav />
            </header>
        );
    }
}

export default withRouter(Header);