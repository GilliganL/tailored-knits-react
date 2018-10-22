import React from 'react';

import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { required, nonEmpty } from '../validators';

import { updateProject } from '../actions/projects';
import { updatePattern } from '../actions/patterns';
import { updateUser } from '../actions/users';

import Input from './input';


export class MeasurementsForm extends React.Component {

    //if statement for different onSubmit functions?
    onSubmit(values) {
        if (values) {
            return this.props
                .dispatch(updatePattern(values))
                .then(res => {
                    values.pattern = res.pattern._id
                    return values
                })
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

        // if (!this.props.editing) {
        //     return (
        //         <button className='add-button' onClick={() => this.props.setEditing(true)}>Update</button>
        //     );
        // }

        return (
            <fieldset className='add-project-container'>
                <legend>Add Project</legend>
                <form id='add-project-form'
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                    <ul className='form-wrapper' role='none'>
                        <li className='form-row'>
                            <Field
                                type='text'
                                name='chest'
                                component={Input}
                                label='Chest'
                                validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <Field
                                type='text'
                                label='Waist'
                                name='waist'
                                component={Input}
                                validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <Field
                                type='text'
                                label='Hips'
                                name='hips'
                                component={Input}
                                validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <Field
                                type='text'
                                label='Upper Arm'
                                name='upperArm'
                                component={Input}
                                validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <Field
                                type='text'
                                label='Length'
                                name='length'
                                component={Input}
                                validate={[required, nonEmpty]} />
                        </li>
                        <li className='form-row'>
                            <Field
                                type='text'
                                label='Wrist'
                                name='wrist'
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
})(MeasurementsForm);
