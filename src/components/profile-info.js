import React from 'react';
import { connect } from 'react-redux';
import { fetchUserById, setEditing } from '../actions/users';
import ProfileForm from './profile-form';

export class ProfileInfo extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchUserById(this.props.id));
    }

    setEditing(editing) {
        this.props.dispatch(setEditing(editing));
    }

    render() {
        if (!this.props.editing) {
            return (
                <section className='profile-section'>
                    <ul className='profile-list'>
                        <li className='list-row'>
                            <h2 className='list-title'>Your Profile</h2>
                        </li>
                        <li className='list-row'>
                            <label className='label'>Username</label>
                            <p className='value'>{this.props.username}</p>
                        </li>
                        <li className='list-row'>
                            <label className='label'>Name</label>
                            <p className='value'>{this.props.name}</p>
                        </li>
                        <li className='list-row'>
                            <label className='label'>Email</label>
                            <p className='value'>{this.props.user.email}</p>
                        </li>
                        <li className='list-row button-row'>
                            <button id='edit-profile-button' onClick={() => this.setEditing(true)}>Edit Profile</button>
                        </li>
                    </ul>
                </section>
            )
        }

        return (
            <section className='profile-section'>
                <ProfileForm />
            </section>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.authReducer;
    return {
        id: currentUser.id,
        username: currentUser.username,
        //fix so updating user updates currentUser
        name: `${state.usersReducer.user.firstName} ${state.usersReducer.user.lastName}`,
        user: state.usersReducer.user,
        editing: state.usersReducer.editing
    }
}

export default connect(mapStateToProps)(ProfileInfo);
