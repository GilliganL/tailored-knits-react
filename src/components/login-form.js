import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';

import { login } from '../actions/auth';
import { required, nonEmpty } from '../validators';
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

        return (
            <fieldset className='login-form-container'>
                <legend>Login</legend>
                <form id='login'
                    onSubmit={this.props.handleSubmit(values =>
                        this.onSubmit(values)
                    )}>
                    <ul className='form-wrapper' role='none'>
                        <li className='form-row'>
                            <label htmlFor='username'>Username</label>
                            <Field type='text' id='loginUsername' name='username' component='input' validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='password'>Password</label>
                            <Field type='password' id='loginPassword' name='password' component='input' validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row hidden' id='login-error-row' hidden>
                            <p id='login-error'></p>
                        </li>
                        {formError}
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
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', Object.keys(errors)[0]))
})(Login);