import React from 'react';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { handleImage, updateProject, fetchProjectById } from '../actions/projects';

import './project-images.css';

export class ProjectImages extends React.Component {

    onSubmit(event) {
        event.preventDefault();
        const imageObject = {
            images: [...this.props.images, this.props.image]
        }
        if (this.props.image) {
            return this.props
                .dispatch(updateProject(this.props.id, imageObject))
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
                <fieldset className='images-form-container'>
                    <legend>Photo Upload</legend>
                    <form className='image-form'
                        onSubmit={e => this.onSubmit(e)}>
                        {/* <ul className='form-wrapper' role='none'>
                            <li className='list-row form-row'> */}
                        <Field
                            accept='.jpg, .png, .jpeg'
                            name='upload'
                            id='upload'
                            component={UploadImage}
                        />
                        {/* </li> */}
                        {imagePreview}
                        {formError}
                        {/* <li className='form-row button-row'> */}
                        <button id='image-button'>Upload</button>
                        {/* </li>
                        </ul> */}
                    </form>
                </fieldset>
            </section>
        )
    }
}

export default reduxForm({
    form: 'projectImages',
    onSubmitFail: (errors, dispatch) => dispatch(focus('projectImages', Object.keys(errors)[0]))
})(ProjectImages);

