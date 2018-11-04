import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import { fetchProjectById, deleteProject, activeTab } from '../actions/projects';
import Measurements from './measurements';
import ProjectImages from './project-images';
import Stitches from './stitches';

import './project-detail.css';

export class ProjectDetail extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchProjectById(this.props.match.params.projectId));
        this.props.dispatch(activeTab('stitches'));
    }

    showTab(display) {
        if (this.props.activeTab === display) {
            this.props.dispatch(activeTab('stitches'));
        } else {
            this.props.dispatch(activeTab(display));
        }
    }

    onClick() {
        if (window.confirm('Are you sure?')) {
            return this.props
                .dispatch(deleteProject(this.props.match.params.projectId))
                .then(() => this.props.history.push('/projects'))
        }
    }

    render() {
        let display;
        if (this.props.project && this.props.activeTab === 'stitches') {
            display = (
                <section className='stitches-section'>
                    <Stitches content={this.props.project} type='Project' />
                    <Stitches content={this.props.pattern} type='Pattern' />
                </section>
            )
        } else if (this.props.project && this.props.activeTab === 'measurements') {
            display = (
                <section className='measurements-section'>
                    <Measurements form='patternForm' type='Pattern' content={this.props.project.pattern} initialValues={this.props.pattern} id={this.props.match.params.projectId} />
                    <Measurements form='projectForm' type='Project' content={this.props.project} initialValues={this.props.project} id={this.props.match.params.projectId} />
                    <Measurements form='userForm' type='User' content={this.props.project.user} initialValues={this.props.project.user} id={this.props.match.params.projectId} />
                </section>
            )
        }

        return (
            <main role='main'>
                <h1 className='page-title'>{this.props.project.name}</h1>
                <button className='tablinks measurements-heading' onClick={() => this.showTab('measurements')}><h2>Measurements</h2></button>
                <button className='tablinks upload-heading' onClick={() => this.showTab('upload')}><h2>Upload Image</h2></button>
                <ProjectImages images={this.props.images} image={this.props.image} id={this.props.match.params.projectId} />
                {display}
                <button id='delete-button' type='button' onClick={() => this.onClick()}>Delete</button>
            </main>
        )
    }
}

const mapStateToProps = state => {
    let image;
    if (state.projectsReducer.image) {
        image = state.projectsReducer.image
    }
    const pattern = state.projectsReducer.project.pattern;
    const images = state.projectsReducer.project.images;
    return {
        project: state.projectsReducer.project,
        pattern,
        images,
        image,
        activeTab: state.projectsReducer.activeTab
    }
}

export default withRouter(requiresLogin()(connect(mapStateToProps)(ProjectDetail)));