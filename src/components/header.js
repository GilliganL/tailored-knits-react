import React from 'react';

import Nav from './nav';

export default function Header(props) {
    return (
        <header>
            <Nav />
            <h1>Tailored Knits</h1>
            <p>Modify sweater patterns for a personalized fit with the help of Tailored Knits.</p>
        </header>
    );
}