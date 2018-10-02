import React from 'react';

import './signup-form.css';

export default function Signup(props) {
    return (
        <fieldset className='signup-form-container'>
            <legend>Sign Up</legend>
            <form id='sign-up-form'>
                <ul className='form-wrapper' role='none'>
                    <li className='form-row'>
                        <label for='first-name'>First Name</label>
                        <input type='text' id='first-name' name='first-name' required />
                    </li>
                    <li className='form-row'>
                        <label for='last-name'>Last Name</label>
                        <input type='text' id='last-name' name='last-name' required />
                    </li>
                    <li className='form-row'>
                        <label for='username'>Username</label>
                        <input type='text' id='username' name='username' required />
                    </li>
                    <li className='form-row'>
                        <label for='email'>Email</label>
                        <input type='text' id='email' name='email' required />
                    </li>
                    <li className='form-row'>
                        <label for='password'>Password</label>
                        <input type='password' id='password' name='password' required />
                    </li>
                    <li className='form-row hidden' id='signup-error-row' hidden>
                        <p id='signup-error'></p>
                    </li>
                    <li className='form-row'>
                        <button type='submit' id='sign-up-button'>Sign Up</button>
                    </li>
                </ul>
            </form>
        </fieldset>
    )
}