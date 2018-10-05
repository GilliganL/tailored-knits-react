import React from 'react';
import { reduxForm, Field } from 'redux-form';

import './login-form.css';

export class Login extends React.Component {

    onSubmit(values) {
        console.log(values);
        //ajax action to login
    }

    render() {
        return (
            <fieldset className='login-form-container'>
                <legend>Login</legend>
                <form id='login'
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    <ul className='form-wrapper' role='none'>
                        <li className='form-row'>
                            <label htmlFor='login-username'>Username</label>
                            <Field type='text' id='login-username' name='login-username' component='input' />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='login-password'>Password</label>
                            <Field type='password' id='login-password' name='login-password' component='input' />
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
}

export default reduxForm({
    form: 'login'
})(Login);