import React from 'react';
import { reduxForm, Field, focus } from 'redux-form';
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

const mapStateToProps = state => {
    const user = state.users.data;
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }
}

ProfileForm = reduxForm({
    form: 'profileForm',
    onSubmitFail: (errors, dispatch) => dispatch(focus('profileForm', Object.keys(errors)[0]))
})(ProfileForm);

export default connect(mapStateToProps)(ProfileForm);