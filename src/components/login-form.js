import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import { login } from '../actions/auth';
import { required, nonEmpty } from '../validators';
import Input from './input';
import './login-form.css';

export class Login extends React.Component {

    onSubmit(values) {
        return this.props
            .dispatch(login(values.username, values.password))
    }

    render() {
        let formError = (
            <li className='form-row'>
                <div className='formError' aria-live='assertive'>
                    {this.props.error}
                </div>
            </li>
        )
        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                <li className='form-row message message-succes'>
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
                <legend>Login</legend>
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
                        {formError}
                        {successMessage}
                        {errorMessage}
                        <li className='form-row'>
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