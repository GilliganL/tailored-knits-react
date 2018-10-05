import React from 'react';
import { reduxForm, Field } from 'redux-form';

import {registerUser, login} from '../actions';
// import {login} from '../actions/auth'

import './signup-form.css';

export class Signup extends React.Component {

    onSubmit(values) {
       return this.props    
        .dispatch(registerUser(values))
        .then(() => this.props.dispatch(login(values.username, values.password)));
    }

    render() {
        return (
            <fieldset className='signup-form-container'>
                <legend>Sign Up</legend>
                <form id='sign-up-form'
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    <ul className='form-wrapper' role='none'>
                        <li className='form-row'>
                            <label htmlFor='firstName'>First Name</label>
                            <Field type='text' id='firstName' name='firstName' component='input' />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='lastName'>Last Name</label>
                            <Field type='text' id='lastName' name='lastName' component='input' />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='username'>Username</label>
                            <Field type='text' id='username' name='username' component='input' />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='email'>Email</label>
                            <Field type='text' id='email' name='email' component='input' />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='password'>Password</label>
                            <Field type='password' id='password' name='password' component='input' />
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
}

export default reduxForm({
    form: 'signup'
})(Signup);