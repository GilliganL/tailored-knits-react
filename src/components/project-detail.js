import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import requiresLogin from './requires-login';
import { handleImage, updateProject, fetchProjectById, clearImage } from '../actions/projects';
import ImagesForm from './images-form';
import { deleteProject, activeTab } from '../actions/projects';
import Measurements from './measurements';
import ProjectImages from './project-images';
import Stitches from './stitches';
import Notes from './notes';

import './project-detail.css';

export class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.onClickImage = this.onClickImage.bind(this);
    }

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

    onClickImage(event) {
        event.preventDefault();
        if (this.props.croppedFile) {
            return this.props.dispatch(handleImage(this.props.croppedFile))
                .then((res) => {
                    const imageObject = {
                        images: [...this.props.images, res.image]
                    }
                    return this.props.dispatch(updateProject(this.props.match.params.projectId, imageObject))
                })
                .then(() => this.props.dispatch(clearImage()))
                .then(() => this.props.dispatch(fetchProjectById(this.props.match.params.projectId)))
                .catch(err => {
                    const { reason, message, location } = err;
                    if (reason === 'ValidationError') {
                        return Promise.reject(
                            new SubmissionError({
                                [location]: message
                            })
                        );
                    }
                    return Promise.reject(
                        new SubmissionError({
                            _error: 'Error submitting message'
                        })
                    );
                });
        }
    }

    render() {
        let display;
        let measurementsClass;
        let uploadClass;
        if (this.props.project && this.props.activeTab === 'stitches') {
            display = (
                <section className='stitches-section'>
                    <Stitches content={this.props.project} type='Project' style={this.props.style} />
                    <Stitches content={this.props.pattern} type='Pattern' style={this.props.style} />
                </section>

            )
            measurementsClass = '';
            uploadClass = '';
        } else if (this.props.project && this.props.activeTab === 'measurements') {
            display = (
                <section className='measurements-section'>
                    <Measurements form='patternForm' type='Pattern' style={this.props.style} content={this.props.project.pattern} initialValues={this.props.pattern} id={this.props.match.params.projectId} />
                    <Measurements form='projectForm' type='Project' style={this.props.style} content={this.props.project} initialValues={this.props.project} id={this.props.match.params.projectId} />
                    <Measurements form='userForm' type='User' style={this.props.style} content={this.props.project.user} initialValues={this.props.project.user} id={this.props.match.params.projectId} />
                </section>
            )
            measurementsClass = 'active';
            uploadClass = '';
        } else if (this.props.project && this.props.activeTab === 'upload') {
            display = (
                <section className='upload-section'>
                    <ImagesForm saveFile={(e) => this.onClickImage(e)} />
                </section>
            )
            measurementsClass = '';
            uploadClass = 'active';
        }
        
        let notes;
        if (this.props.notes) {
            notes = {
                notes: this.props.notes
            }
        }
        return (
            <main role='main' id='main-detail'>
                <h1 className='page-title'>{this.props.project.name}</h1>
                <button className={'tablinks measurements-heading ' + measurementsClass} onClick={() => this.showTab('measurements')}><h2>Measurements</h2></button>
                <button className={'tablinks upload-heading ' + uploadClass} onClick={() => this.showTab('upload')}><h2>Upload Image</h2></button>
                <ProjectImages images={this.props.images} image={this.props.image} id={this.props.match.params.projectId} />
                {display}
                <Notes content={this.props.notes} initialValues={notes} id={this.props.match.params.projectId} />
                <button id='delete-button' type='button' onClick={() => this.onClick()}>Delete</button>
            </main>
        )
    }
}

const mapStateToProps = state => {
    const image = state.projectsReducer.image ? state.projectsReducer.image : '';
    const style = state.projectsReducer.project.pattern ? state.projectsReducer.project.pattern.style : '';
    const notes = state.projectsReducer.project.notes;
    const pattern = state.projectsReducer.project.pattern;
    const images = state.projectsReducer.project.images; 
    return {
        project: state.projectsReducer.project,
        pattern,
        images,
        image,
        activeTab: state.projectsReducer.activeTab,
        notes,
        croppedFile: state.projectsReducer.croppedFile,
        style
    }
}

export default withRouter(requiresLogin()(connect(mapStateToProps)(ProjectDetail)));