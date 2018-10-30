import React from 'react';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { fileType } from '../validators';
import { handleImage, updateProject, fetchProjectById } from '../actions/projects';

import './project-images.css';

export class ProjectImages extends React.Component {

    onSubmit(event) {
        console.log(event.upload[0])
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
        const myObject = this;
        const adaptFileEventToValue = delegate => e => {
            myObject.props.dispatch(handleImage(e.target.files[0], myObject.props.id, myObject.props.images));
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
                        onSubmit={this.props.handleSubmit(value => this.onSubmit(value))}
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

