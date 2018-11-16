import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { editNotes, updateProject, fetchProjectById } from '../actions/projects';
import Input from './input';
import './notes.css';

export class Notes extends React.Component {

    setEditing(editing) {
        this.props.dispatch(editNotes(editing))
    }

    onSubmit(value) {
        return this.props
            .dispatch(updateProject(this.props.id, value))
            .then(() => this.props.dispatch(fetchProjectById(this.props.id)))
            .then(() => this.setEditing(false))
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

        let content;
        if (!this.props.editing) {
            content = (
                <div>
                    <p>{this.props.content}</p>
                    <button type='button' id='notes-button' onClick={() => this.setEditing(true)}>
                        Edit
                    </button>
                </div>
            )
        } else {
            content = (
                    <form className='notes-form'
                        onSubmit={this.props.handleSubmit(value => this.onSubmit(value))}>
                        <Field
                            element='textarea'
                            label='Notes'
                            name='notes'
                            component={Input}
                        />
                        {formError}
                        <button id='update-notes-button'>Update</button>
                    </form>
            )
        }

        return (
            <section className='notes-section'>
                <h3 className='notes-heading'>Notes</h3>
                {content}
            </section>
        )
    }
}

const mapStateToProps = state => {

    return {
        editing: state.projectsReducer.editingNotes
    }
}

Notes = reduxForm({
    form: 'notes',
    onSubmitFail: (errors, dispatch) => dispatch(focus('notes', Object.keys(errors)[0]))
})(Notes);

export default connect(mapStateToProps)(Notes);