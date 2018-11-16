import React from 'react';

import requiresLogin from './requires-login';

import ProfileInfo from './profile-info';

import './profile.css';

export class Profile extends React.Component {

    render() {

        return (
            <main className='main-profile' role='main'>
                <div className='profile-container'>
                    <h1 className='profile-title'>Profile</h1>
                    <ProfileInfo />
                </div>
            </main>
        );
    }
}

export default requiresLogin()(Profile);