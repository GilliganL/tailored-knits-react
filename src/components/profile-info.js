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
                    <h3>Your Profile</h3>
                    <h3>{this.props.username}</h3>
                    <p>{this.props.name}</p>
                    <p>{this.props.user.email}</p>
                    <button onClick={() => this.setEditing(true)}>Edit Profile</button>
                </section>
            )
        }

        return (
            <ProfileForm />
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
