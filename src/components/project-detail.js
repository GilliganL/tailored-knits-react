import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import { fetchProjectById, deleteProject } from '../actions/projects';
import Measurements from './measurements';
import ProjectImages from './project-images';

import './project-detail.css';

export class ProjectDetail extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchProjectById(this.props.match.params.projectId))
    }

    onClick() {
        if (window.confirm('Are you sure?')) {
            return this.props
                .dispatch(deleteProject(this.props.match.params.projectId))
                .then(() => this.props.history.push('/projects'))
        }
    }

    render() {
        if (!this.props.project) {
            return (
                <div></div>
            )
        }

        return (
            <div className='project-detail'>
                <h1>Project Detail</h1>
                <section className='images-section'>
                    <ProjectImages images={this.props.project.images} id={this.props.match.params.projectId} />
                </section>
                <section className='measurements-section'>
                    <Measurements form='patternForm' type='Pattern' content={this.props.project.pattern} initialValues={this.props.pattern} id={this.props.match.params.projectId} />
                    <Measurements form='projectForm' type='Project' content={this.props.project} initialValues={this.props.project} id={this.props.match.params.projectId} />
                    <Measurements form='userForm' type='User' content={this.props.project.user} initialValues={this.props.project.user} id={this.props.match.params.projectId} />
                </section>
                <button type='button' onClick={() => this.onClick()}>Delete</button>
            </div>
        )
    }
}

//can't do pattern.style here
const mapStateToProps = state => {
    const pattern = state.projectsReducer.project.pattern
    return {
        project: state.projectsReducer.project,
        pattern
    }
}

export default withRouter(requiresLogin()(connect(mapStateToProps)(ProjectDetail)));