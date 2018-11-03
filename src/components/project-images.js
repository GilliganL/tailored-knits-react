import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, focus, SubmissionError } from 'redux-form';
import { handleImage, updateProject, fetchProjectById, clearImage } from '../actions/projects';
import ImagesForm from './images-form';
import './project-images.css';

export class ProjectImages extends React.Component {

    onClick(event) {
        event.preventDefault();
        if (this.props.croppedFile) {
            return this.props.dispatch(handleImage(this.props.croppedFile))
                .then((res) => {
                    const imageObject = {
                        images: [...this.props.images, res.image]
                    }
                    return this.props.dispatch(updateProject(this.props.id, imageObject))
                })
                .then(() => this.props.dispatch(clearImage()))
                .then(() => this.props.dispatch(fetchProjectById(this.props.id)))
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
        let formError;
        if (this.props.error) {
            formError = (
                <li className='form-row'>
                    <div className='formError' aria-live='assertive'>
                        {this.props.error}
                    </div>
                </li>
            );
        }

        let images = this.props.images.map((image, index) =>
            (
                <figure>
                    <img src={image} className='project-image' alt='Knit sweater' key={index} />
                </figure>
            )
        )

        return (
            <section className='images-section'>
                {images}
                <ImagesForm saveFile={(e) => this.onClick(e)} />
                {formError}
            </section>
        )
    }
}

const mapStateToProps = state => ({
    croppedImage: state.projectsReducer.croppedImage,
    croppedFile: state.projectsReducer.croppedFile
});


const ProjectImagesForm = reduxForm({
    form: 'projectImages',
    onSubmitFail: (errors, dispatch) => dispatch(focus('projectImages', Object.keys(errors)[0]))
})(ProjectImages);

export default connect(mapStateToProps)(ProjectImagesForm);
