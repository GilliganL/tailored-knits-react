import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
//import { fetchUsers } from '../actions/users';

export class Projects extends React.Component {
    // componentDidMount() {
    //     this.props.dispatch(fetchUsers());
    // }

    render() {
    

        return (
            <h1>Projects</h1>

        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: currentUser.fullName,
        users: state.users.data
    }
}

export default requiresLogin()(connect(mapStateToProps)(Projects));