import React from 'react';

import './login-form.css';

export default function Login(props) {
    return (
            <fieldset className='login-form-container'>
                <legend>Login</legend>
                <form id='login-form'>
                    <ul className='form-wrapper' role='none'>
                        <li className='form-row'>
                            <label for='login-username'>Username</label>
                            <input type='text' id='login-username' name='login-username' required />
                        </li>
                        <li className='form-row'>
                            <label for='login-password'>Password</label>
                            <input type='password' id='login-password' name='login-password' required />
                        </li>
                        <li className='form-row hidden' id='login-error-row' hidden>
                            <p id='login-error'></p>
                        </li>
                        <li className='form-row'>
                            <button type='submit' id='login-button'>Login</button>
                        </li>
                    </ul>
                </form>
            </fieldset>
    );
}