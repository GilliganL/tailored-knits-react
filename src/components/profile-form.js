import React from 'react';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { email, required, nonEmpty, isTrimmed, matches, length } from '../validators';
import { updateUser, setEditing } from '../actions/users';

const passwordLength = length({min: 8, max: 72});
const matchesPassword = matches('password')

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
        console.log(values)
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
            <section className='profile-section'>
                <fieldset className='edit-profile-container'>
                    <legend>Edit Your Profile</legend>
                    <form id='sign-up-form'
                        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                        <ul className='form-wrapper' role='none'>
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
                                <Field type='password' id='password' name='password' component='input' validate={[nonEmpty, isTrimmed, passwordLength]} />
                            </li>
                            <li className='form-row'>
                                <label htmlFor='passwordConfirm'>Confirm Password</label>
                                <Field type='password' id='passwordConfirm' name='passwordConfirm' component='input' validate={[nonEmpty, matchesPassword]} />
                            </li>
                            {formError}
                            <li className='form-row'>
                                <button type='submit' id='profile-button'>Submit</button>
                            </li>
                        </ul>
                    </form>
                </fieldset>
            </section>

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