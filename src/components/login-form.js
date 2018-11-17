import React from 'react';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { login } from '../actions/auth';
import { required, nonEmpty } from '../validators';
import Input from './input';

export class Login extends React.Component {

    onSubmit(values) {
        return this.props
            .dispatch(login(values.loginUsername, values.loginPassword))
            .catch(err => {
                let { code, reason, message } = err;
                message =
                    code === 401
                        ? 'Incorrect username or password'
                        : 'Unable to login, please try again';
                if (reason === 'ValidationError' || code === 401) {
                    throw new SubmissionError({
                        _error: message
                    })
                }
                throw new SubmissionError({
                    _error: 'Error submitting Login Form.'
                })
            });
    }

    render() {
        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                <li className='form-row message message-success'>
                    Form submitted successfully1
                </li>
            );
        }
        let errorMessage;
        if (this.props.error) {
            errorMessage = (
                <li className='form-row message message-error'>
                    {this.props.error}
                </li>
            );
        }

        return (
            <fieldset className='login-form-container'>
                <legend><h3>Login</h3></legend>
                <form id='login'
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    <ul className='form-wrapper' role='none'>
                        <li className='form-row'>
                            <Field
                                type='text'
                                name='loginUsername'
                                component={Input}
                                label='Username'
                                validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <Field
                                type='password'
                                name='loginPassword'
                                component={Input}
                                label='Password'
                                validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row hidden' id='login-error-row' hidden>
                            <p id='login-error'></p>
                        </li>
                        {successMessage}
                        {errorMessage}
                        <li className='form-row button-row'>
                            <button
                                type='submit'
                                id='login-button'
                                disabled={this.props.pristine || this.props.submitting}>
                                Login
                            </button>
                        </li>
                    </ul>
                </form>
            </fieldset>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', Object.keys(errors)[0]))
})(Login);