import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';

import { registerUser } from '../actions/users';
import { login } from '../actions/auth'
import { required, nonEmpty, length, isTrimmed, matches, email } from '../validators';
import './signup-form.css';

const passwordLength = length({min: 8, max: 72});
const matchesPassword = matches('password')

export class Signup extends React.Component {

    onSubmit(values) {
        return this.props
            .dispatch(registerUser(values))
            .then(() => this.props.dispatch(login(values.username, values.password)));
    }

    render() {
        let formError = (
            <li className='form-row'>
                <div className='formError' aria-live='assertive'>
                    {this.props.error}
                </div>
            </li>
        )
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
                            <Field type='text' id='firstName' name='firstName' component='input' validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='lastName'>Last Name</label>
                            <Field type='text' id='lastName' name='lastName' component='input' validate={[required, nonEmpty]}/>
                        </li>
                        <li className='form-row'>
                            <label htmlFor='username'>Username</label>
                            <Field type='text' id='username' name='username' component='input' validate={[required, nonEmpty, isTrimmed]} />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='email'>Email</label>
                            <Field type='text' id='email' name='email' component='input' validate={[required, nonEmpty, email]} />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='password'>Password</label>
                            <Field type='password' id='password' name='password' component='input' validate={[required, nonEmpty, isTrimmed, passwordLength]} />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='passwordConfirm'>Confirm Password</label>
                            <Field type='password' id='passwordConfirm' name='passwordConfirm' component='input' validate={[required, nonEmpty, matchesPassword]} />
                        </li>
                        <li className='form-row hidden' id='signup-error-row' hidden>
                            <p id='signup-error'></p>
                        </li>
                        {formError}
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
    form: 'signup',
    onSubmitFail: (errors, dispatch) => dispatch(focus('signup', Object.keys(errors)[0]))
})(Signup);