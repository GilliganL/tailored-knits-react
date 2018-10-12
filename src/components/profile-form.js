import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';
import { email, required, nonEmpty } from '../validators';
import { updateUser, setEditing } from '../actions/users';

export class ProfileForm extends React.Component {

    onSubmit(values) {
        //submit updatebyUserId, setEditting
        return this.props
            .dispatch(updateUser(this.props.id, values))
            .then(() => this.props.dispatch(setEditing(false)))
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
                                <Field type='text' id='email' name='email' component='input' validate={[required, nonEmpty, email]} />
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

export default reduxForm({
    form: 'profileForm',
    onSubmitFail: (errors, dispatch) => dispatch(focus('profileForm', Object.keys(errors)[0]))
})(ProfileForm);