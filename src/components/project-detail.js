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
        this.props.dispatch(activeTab('info'));
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
        let notesClass;
        let infoButton;
        let infoClass = 'active';
        if (this.props.project && this.props.activeTab === 'stitches') {
            display = (
                <section className='stitches-section'>
                    <h2>Stitches</h2>
                    <Stitches content={this.props.project} type='Project' style={this.props.style} />
                    <Stitches content={this.props.pattern} type='Pattern' style={this.props.style} />
                </section>

            )
            measurementsClass = '';
            uploadClass = '';
            infoClass = '';
            infoButton = 'Info'
        } else if (this.props.project && this.props.activeTab === 'measurements') {
            display = (
                <section className='measurements-section'>
                    <h2>Measurements</h2>
                    <Measurements form='patternForm' type='Pattern' style={this.props.style} content={this.props.project.pattern} initialValues={this.props.pattern} id={this.props.match.params.projectId} />
                    <Measurements form='projectForm' type='Project' style={this.props.style} content={this.props.project} initialValues={this.props.project} id={this.props.match.params.projectId} />
                    <Measurements form='userForm' type='User' style={this.props.style} content={this.props.project.user} initialValues={this.props.project.user} id={this.props.match.params.projectId} />
                </section>
            )
            measurementsClass = 'active';
            uploadClass = '';
            infoClass = '';
            infoButton = 'Stitches';
        } else if (this.props.project && this.props.activeTab === 'upload') {
            display = (
                <section className='upload-section'>
                    <ImagesForm saveFile={(e) => this.onClickImage(e)} />
                </section>
            )
            measurementsClass = '';
            uploadClass = 'active';
            infoClass = '';
            notesClass = 'hidden';
            infoButton = 'Stitches';
        } else if (this.props.project && this.props.activeTab === 'info') {
            display = (
                <section className='info-section'>
                    <h2>Getting Started</h2>
                    <p>Tailored Knits calculates your stitch counts for you! To get started
					please click on 'Measurements' and enter Project or Pattern measurements.
					You can also enter your measurements!</p>
                    <p>In Pattern Measurements enter the original pattern measurements. In Project
					Measurements enter the modified final measurements that you want for your project.
					Click on the Measurements tab again to close it and you will see your stitch counts!</p>
                    <h3>How to take measurements</h3>
                    <p><span className='info-name'>Chest:</span> Measure around the fullest or widest part of the bust or chest<br />
                        <span className='info-name'>Waist:</span> Measure your natural waist<br />
                        <span className='info-name'>Hips:</span> Measure around the widest point of your hips<br />
                        <span className='info-name'>Length:</span> You can use this field for any length measurement, most commonly used
					    for under arm to the hem at the hips<br />
                        <span className='info-name'>Upper Arm:</span> Measure around the largest part of your upper arm<br />
                        <span className='info-name'>Wrist:</span> Measure around your wrist<br />
                        <span className='info-name'>Arm Hole:</span> Measure from the top center of your shoulder above your armpit to the center of your armpit<br />
                        <span className='info-name'>Yoke Depth:</span> This measurement is the width of the Yoke on yoke style sweaters<br />
                        <span className='info-name'>Raglan Depth:</span> The length of the seam between the body and the sleeve where the raglan increases or decreases
                        happen. Raglan depth is also used after the yoke depth has completed but before the bottom of the armhole on
					some sweaters. </p>
                    <h3>Which size of the pattern do I choose?</h3>
                    <p>Best practice is to choose the pattern size that fits your bust and modify the rest. For example, if your
					bust measurement is a size 40 but your hips measurement is a size 36 or size 44, use the size 40 of the pattern
					and modify from the bust down. Remember to put all of your increased or decreased lenght in the same section of
					the body. Add some before the narrowest part of the waist, some during the straight waist section, and some after
					if you're doing waist shaping.</p>
                </section>
            )
            measurementsClass = '';
            uploadClass = '';
            infoClass = 'active';
            infoButton = 'Stitches';
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
                <button className={'tablinks info-heading ' + infoClass} onClick={() => this.showTab('info')}><h2>{infoButton}</h2></button>
                <button className={'tablinks measurements-heading ' + measurementsClass} onClick={() => this.showTab('measurements')}><h2>Measurements</h2></button>
                <button className={'tablinks upload-heading ' + uploadClass} onClick={() => this.showTab('upload')}><h2>Upload Image</h2></button>
                <ProjectImages image={this.props.image} id={this.props.match.params.projectId} />
                {display}
                <Notes class={notesClass} content={this.props.notes} initialValues={notes} id={this.props.match.params.projectId} />
                <button id='delete-button' type='button' onClick={() => this.onClick()}>Delete Project</button>
            </main>
        )
    }
}

const mapStateToProps = state => {
    const image = state.projectsReducer.image ? state.projectsReducer.image : '';
    const style = state.projectsReducer.project.pattern ? state.projectsReducer.project.pattern.style : '';
    const pattern = state.projectsReducer.project.pattern;
    return {
        project: state.projectsReducer.project,
        pattern,
        image,
        activeTab: state.projectsReducer.activeTab,
        notes: state.projectsReducer.project.notes,
        croppedFile: state.projectsReducer.croppedFile,
        style
    }
}

export default withRouter(requiresLogin()(connect(mapStateToProps)(ProjectDetail)));