import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchUsers } from '../actions/users';
import ProfileInfo from './profile-info';
import Measurements from './measurements';

export class Profile extends React.Component {

    componentDidMount() {
        //fetch current user info - pass username
        this.props.dispatch(fetchUsers());
        //fetch measurement info - only render Measurements if there are any
        
    }

    

    render() {
        
        //map list of measurements or pass all to component?
        console.log(this.props.protectedData);
        return (
            <div>
                <h1>Profile</h1>
                <ProfileInfo />
                <Measurements />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: currentUser.fullName,
        protectedData: state.protectedData.data
    }
}

export default requiresLogin()(connect(mapStateToProps)(Profile));