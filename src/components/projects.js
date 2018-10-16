import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchProjects, createProject } from '../actions/projects';

export class Projects extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProjects());
    }



    //button for each project onClick sends to /projects/id {SingleProject}

    render() {
        console.log(this.props.projects)
        let projects;
        if (this.props.projects) {
            projects = this.props.projects.map((project, index) =>
                (<li key={index}>
                    <h4>{project.name}</h4>
                    <p>{project.size}</p>
                    <p>{project.style}</p>
                </li>)
            )
        }


        return (
            <div>
                <h1>Projects</h1>
                <ul>
                    {projects}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: currentUser.username,
        name: currentUser.fullName,
        projects: state.projects.data
    }
}

export default requiresLogin()(connect(mapStateToProps)(Projects));