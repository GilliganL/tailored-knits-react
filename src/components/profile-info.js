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
                    <p>{this.props.users.email}</p>
                    <button onClick={() => this.setEditing(true)}>Edit Profile</button>
                </section>
            )
        }

        return (
            <ProfileForm id={this.props.id} />
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
   
    return {
        id: currentUser.id,
        username: currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        users: state.users.data,
        editing: state.users.editing
    }
}

export default connect(mapStateToProps)(ProfileInfo);
