import React from 'react';

import requiresLogin from './requires-login';

import ProfileInfo from './profile-info';
import Measurements from './measurements';

import './profile.css';

export class Profile extends React.Component {

    render() {
      
        return (
            <div>
                <h1>Profile</h1>
                <ProfileInfo />
                {/* <Measurements /> */}
            </div>
        );
    }
}

export default requiresLogin()(Profile);