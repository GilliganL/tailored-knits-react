import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { handleImage, updateProject, fetchProjectById } from '../actions/projects';
import ImagesForm from './images-form';
import './project-images.css';

export class ProjectImages extends React.Component {

    onSubmit(event) {
        console.log(this.props.croppedImage)
 
        event.preventDefault();

        if (this.props.croppedImage) {

            return this.props.dispatch(handleImage(this.props.croppedImage))
                .then((url) => {
                    const imageObject = {
                        images: [...this.props.images, url]
                    }
                    return this.props.dispatch(updateProject(this.props.id, imageObject))
                })
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

        let imagePreview;
        if (this.props.image) {
            imagePreview = (
                <figure>
                    <img src={this.props.image} className='preview-image' alt='Knit sweater' />
                </figure>
            )
        }

        // const myObject = this;
        const adaptFileEventToValue = delegate => e => {
            this.props.dispatch(handleImage(e.target.files[0]));
            return delegate(e.target.files[0])
        }

        const UploadImage = ({ input: { value: omitValue, onChange, ...inputProps }, meta: omitMeta, ...props }) => (
            <input type='file' onChange={adaptFileEventToValue(onChange)} {...inputProps} {...props} />
        );

        return (
            <section className='images-section'>
                {images}
                <ImagesForm />
                <button type='button' id='save-image' onClick={(e) => this.onSubmit(e)}>Save</button>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    croppedImage: state.projectsReducer.croppedImage
});

const ProjectImagesForm = reduxForm({
    form: 'projectImages',
    onSubmitFail: (errors, dispatch) => dispatch(focus('projectImages', Object.keys(errors)[0]))
})(ProjectImages);

export default connect(mapStateToProps)(ProjectImagesForm);
