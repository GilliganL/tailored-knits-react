import React from 'react';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { email, required, nonEmpty } from '../validators';
import { updateUser, setEditing } from '../actions/users';


export class ProfileForm extends React.Component {

    componentDidMount() {
        this.handleInitialize();
    }

    handleInitialize() {
        const initialData = {
            'firstName': this.props.firstName,
            'lastName': this.props.lastName,
            'email': this.props.email
        };
        this.props.initialize(initialData);
    }

    onSubmit(values) {
        if (values.password && ((values.password && !values.passwordConfirm) || (values.password && values.passwordConfirm && values.password !== values.passwordConfirm))) {
            throw new SubmissionError({
                _error: 'Password and Confirm Password do not match.'
            })
        }

        if (values.password && (values.password.length < 8 || values.password.length > 72)) {
            throw new SubmissionError({
                _error: 'Password must be between 8 and 72 characters long.'
            })
        }

        if (values.password && values.password !== values.password.trim()) {
            throw new SubmissionError({
                _error: 'Password must not begin or end with a space.'
            })
        }

        return this.props
            .dispatch(updateUser(this.props.id, values))
            .then(() => this.props.dispatch(setEditing(false)))
            .catch(err => {
                const { reason, message } = err;

                if (reason === 'ValidationError') {
                    throw new SubmissionError({
                        _error: message
                    })
                }
                throw new SubmissionError({
                    _error: 'Error submitting Profile Edit Form.'
                })
            });
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
            <fieldset className='edit-profile-container'>
                <legend className='list-title'><h3>Edit Your Profile</h3></legend>
                <form id='sign-up-form'
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                    <ul className='form-wrapper'>
                        <li className='form-row'>
                            <label htmlFor='firstName'>First Name</label>
                            <Field type='text' id='firstName' name='firstName' component='input' validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='lastName'>Last Name</label>
                            <Field type='text' id='lastName' name='lastName' component='input' validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='email'>Email</label>
                            <Field type='email' id='email' name='email' component='input' validate={[required, nonEmpty, email]} />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='passwordCurrent'>Current Password</label>
                            <Field type='password' id='passwordCurrent' name='passwordCurrent' component='input' />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='password'>New Password</label>
                            <Field type='password' id='password' name='password' component='input' />
                        </li>
                        <li className='form-row'>
                            <label htmlFor='passwordConfirm'>Confirm</label>
                            <Field type='password' id='passwordConfirm' name='passwordConfirm' component='input' />
                        </li>
                        {formError}
                        <li className='form-row'>
                            <button type='submit' id='profile-button'>Submit</button>
                        </li>
                    </ul>
                </form>
            </fieldset>
        )
    }
}

const mapStateToProps = state => {
    const user = state.usersReducer.user;
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id
    }
}

ProfileForm = reduxForm({
    form: 'profileForm',
    onSubmitFail: (errors, dispatch) => dispatch(focus('profileForm', Object.keys(errors)[0]))
})(ProfileForm);

export default connect(mapStateToProps)(ProfileForm);