import React from 'react';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { handleImage, updateProject, fetchProjectById } from '../actions/projects';

import './project-images.css';

export class ProjectImages extends React.Component {

    onSubmit(event) {
        event.preventDefault();
        console.log(this.props.images)
        console.log(this.props.image)
        const imageObject = {
            images: [...this.props.images, this.props.image]
        }
        if (this.props.image) {
            this.props.dispatch(updateProject(this.props.id, imageObject))
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
                <img src={image} className='project-image' alt='Knit sweater' key={index} />
            )
        )

        let imagePreview;
        if (this.props.image) {
            imagePreview = <img src={this.props.image} className='preview-image' alt='Knit sweater' />
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
            <div>
                <div className='images-container'>
                    {images}
                </div>
                <fieldset className='images-form-container'>
                    <legend>Photo Upload</legend>
                    <form className='image-form'
                        onSubmit={e => this.onSubmit(e)}
                    >
                        <ul className='form-wrapper' role='none'>
                            <li className='list-row form-row'>
                                <Field
                                    accept='.jpg, .png, .jpeg'
                                    name='upload'
                                    id='upload'
                                    component={UploadImage}
                                />
                            </li>
                            {imagePreview}
                            {formError}
                            <li className='form-row button-row'>
                                <button id='image-button'>Upload</button>
                            </li>
                        </ul>
                    </form>
                </fieldset>
            </div >
        )
    }
}

export default reduxForm({
    form: 'projectImages',
    onSubmitFail: (errors, dispatch) => dispatch(focus('projectImages', Object.keys(errors)[0]))
})(ProjectImages);

