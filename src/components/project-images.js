import React from 'react';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { } from '../validators';
import { setEditing } from '../actions/projects';
import { updateProject, fetchProjectById } from '../actions/projects';
import Input from './input';



export class ProjectImages extends React.Component {

    onChange(value) {
        console.log(value)
    }

    onSubmit(value) {
        console.log(value)
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

        let images = Object.keys(this.props.images).map((image, index) =>
            (
                <li key={index} className='list-row'>
                    <img className='project-image' alt='Knit sweater'>{image}</img>
                </li>
            )
        )

        return (
            <div className={this.props.type.toLowerCase() + `-measurements`}>
                <h2>{this.props.type}</h2>
                <div className='list-container'>
                    {images}
                    <fieldset className='image-form-container'>
                        <legend>Photo Upload</legend>
                        <form className='image-form'
                            onSubmit={this.props.handleSubmit(value => this.onSubmit(value))}>
                            <ul className='form-wrapper' role='none'>
                                <li className='list-row form-row'>
                                    <Field
                                        element='file'
                                        accept='.jpg, .png, .jpeg'
                                        label='Upload A File'
                                        name='upload'
                                        id='upload'
                                        component={Input}
                                        onChange={value => this.onChange(value)}
                                    />
                                </li>
                                {formError}
                                <li className='form-row button-row'>
                                    <button id='image-button'>Upload</button>
                                </li>
                            </ul>
                        </form>
                    </fieldset>
                </div>
            </div >
        )
    }
}

export default reduxForm({
    form: 'projectImages',
    onSubmitFail: (errors, dispatch) => dispatch(focus('projectImages', Object.keys(errors)[0]))
})(ProjectImages);

