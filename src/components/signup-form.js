import React from 'react';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth'
import { required, nonEmpty, length, isTrimmed, matches, email } from '../validators';
import Input from './input';

const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password')

export class Signup extends React.Component {

    onSubmit(values) {
        return this.props
            .dispatch(registerUser(values))
            .then(() => this.props.dispatch(login(values.username, values.password)))
            .catch(err => {
                const { reason, message } = err;

                if (reason === 'ValidationError') {
                    throw new SubmissionError({
                        _error: message
                    })
                }
                throw new SubmissionError({
                    _error: 'Error submitting Signup Form.'
                })
            });
    }

    render() {
        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                <li className=' form-row message message-success'>
                    Form submitted successfully!
                </li>
            );
        }
        let errorMessage;
        if (this.props.error) {
            errorMessage = (
                <li className='message message-error'>
                    {this.props.error}
                </li>
            );
        }
        return (
            <fieldset className='signup-form-container'>
                <legend><h3>Sign Up</h3></legend>
                <form id='sign-up-form'
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                    <ul className='form-wrapper' role='none'>
                        <li className='form-row'>
                            <Field
                                type='text'
                                id='firstName'
                                name='firstName'
                                component={Input}
                                label='First Name'
                                validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <Field
                                type='text'
                                id='lastName'
                                name='lastName'
                                component={Input}
                                label='Last Name'
                                validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <Field
                                type='text'
                                id='username'
                                name='username'
                                component={Input}
                                label='Username'
                                validate={[required, nonEmpty, isTrimmed]} />
                        </li>
                        <li className='form-row'>
                            <Field
                                type='email'
                                name='email'
                                component={Input}
                                label='Email'
                                validate={[required, nonEmpty, email]} />
                        </li>
                        <li className='form-row password-row'>
                            <p>Password must be 8 to 72 characters,<br /> 1 uppercase &amp; lowercase letters, &amp; 1 number</p>
                        </li>
                        <li className='form-row'>
                            <Field
                                type='password'
                                name='password'
                                component={Input}
                                label='Password'
                                validate={[required, nonEmpty, isTrimmed, passwordLength]} />
                        </li>
                        <li className='form-row button-row'>
                            <Field
                                type='password'
                                name='passwordConfirm'
                                component={Input}
                                label='Confirm Password'
                                validate={[required, nonEmpty, matchesPassword]} />
                        </li>
                        {successMessage}
                        {errorMessage}
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
    onSubmitFail: (errors, dispatch) => {
        console.log(errors)
        return dispatch(focus('signup', Object.keys(errors)[0]))
    }
})(Signup);