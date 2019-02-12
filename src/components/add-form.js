import React from 'react';
import { withRouter } from 'react-router';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { required, nonEmpty } from '../validators';
import { createProject } from '../actions/projects';
import { createPattern } from '../actions/patterns';
import Input from './input';
import './add-form.css';

export class AddForm extends React.Component {

    onSubmit(values) {
        if (values) {
            return this.props
                .dispatch(createPattern(values.patternName, values.style))
                .then(res => {
                    values.pattern = res.pattern._id
                    return values
                })
                .then((values) => this.props.dispatch(createProject(values)))
                .then((res) => this.props.history.push(`/projects/${res.project._id}`))
                .catch(err => {
                    const { reason, message } = err;
                    if (reason === 'ValidationError') {
                        throw new SubmissionError({
                            _error: message
                        })
                    }
                    throw new SubmissionError({
                        _error: 'Error submitting add project f orm.'
                    })
                });
        }
    }

    render() {
        let successMessage;
        if (this.props.submitSucceeded) {
            successMessage = (
                <li className=' form-row message message-success'>
                    Form submitted successfully!
                </li>
            );
        }
        let errorMessage;
        if (this.props.error) {
            errorMessage = (
                <li className='message message-error'>
                    {this.props.error}
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
                    <ul className='form-wrapper'>
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
                        <li className='form-row radio'>
                            <label className='radio-label'>Style</label>
                            <Field
                                type='radio'
                                label='Raglan'
                                name='style'
                                component={Input}
                                value='Raglan'
                                validate={[required, nonEmpty]} />
                            <Field
                                type='radio'
                                label='Set In'
                                name='style'
                                component={Input}
                                value='Set In'
                                validate={[required, nonEmpty]} />
                            <Field
                                type='radio'
                                label='Yoke'
                                name='style'
                                component={Input}
                                value='Yoke'
                                validate={[required, nonEmpty]} />
                        </li>
                        {errorMessage}
                        {successMessage}
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


export default withRouter(reduxForm({
    form: 'addForm',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('addForm', Object.keys(errors)[0]))
})(AddForm));
