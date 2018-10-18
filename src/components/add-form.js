import React from 'react';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { required, nonEmpty } from '../validators';
import { createProject } from '../actions/projects';
import { createPattern } from '../actions/patterns';
import Input from './input';


export class AddForm extends React.Component {

    onSubmit(values) {
        if (values) {
            return this.props
                .dispatch(createPattern(values.patternName))
                .then(pattern =>{
                     values.pattern = pattern.data._id
                    return values
                })
                .then((values) => this.props.dispatch(createProject(values)))
                .then((project) => this.props.history.push(`/projects/${project.id}`))
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

        if (!this.props.editing) {
            return (
                <button className='add-button' onClick={() => this.props.setEditing(true)}>Add Project</button>
            );
        }

        return (
            <fieldset className='add-project-container'>
                <legend>Add Project</legend>
                <form id='add-project-form'
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                    <ul className='form-wrapper' role='none'>
                        <li className='form-row'>
                            <Field
                                type='text'
                                name='projectName'
                                component={Input}
                                label='Project Name'
                                validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <Field
                                type='text'
                                label='Pattern Name'
                                name='patternName'
                                component={Input}
                                validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <label>Style</label>
                            <Field
                                type='radio'
                                label='Raglan'
                                name='style'
                                component={Input}
                                value='raglan'
                                validate={[required, nonEmpty]} />
                            <Field
                                type='radio'
                                label='Set In'
                                name='style'
                                component={Input}
                                value='set in'
                                validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <Field
                                type='text'
                                label='Size'
                                name='size'
                                component={Input}
                                validate={[required, nonEmpty]} />
                        </li>
                        {formError}
                        <li className='form-row'>
                            <button
                                type='submit'
                                id='add-project-button'
                                disabled={this.props.pristine || this.props.submitting}>
                                Submit
							</button>
                        </li>
                    </ul>
                </form>
            </fieldset>
        );
    }
}


export default reduxForm({
    form: 'addForm',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('addForm', Object.keys(errors)[0]))
})(AddForm);
