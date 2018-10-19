import React from 'react';
import Measurements from './measurements';

import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import { fetchProjectById, updateProject, deleteProject } from '../actions/projects';
import { fetchPatternById, updatePattern } from '../actions/patterns';
import { fetchUserById, updateUsers } from '../actions/users';

export class ProjectDetail extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchProjectById(this.props.match.params.projectId))
    }

    render() {
        console.log(this.props.project)
        return (
            <div>
                <h1>Project Detail</h1>
                <section className='measurements-container'>
                    <Measurements type='Project' content={this.props.project} />
                    <Measurements type='Pattern' content={this.props.project.pattern} />
                    <Measurements type='User' content={this.props.project.user} />
                </section>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        project: state.projects.project
    }
}

export default requiresLogin()(connect(mapStateToProps)(ProjectDetail));