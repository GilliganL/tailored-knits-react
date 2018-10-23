import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { required, nonEmpty } from '../validators';
import { setEditing } from '../actions/projects';
import { updateProject } from '../actions/projects';
import { updatePattern } from '../actions/patterns';
import { updateUser } from '../actions/users';
import Input from './input';



export class Measurements extends React.Component {

    // calculations - update values as form changes. Send info to server onchange? 

    setEditing(editing, type) {
        let editType = `edit${type}`
        this.props.dispatch(setEditing(editing, editType));
    }

    onSubmit(values) {
        if (this.props.type === 'Project') {
            console.log(values)
            return this.props
                .dispatch(updateProject(values._id, values))
                .then((res) => console.log(res))
                .then(() => this.props.dispatch(setEditing(false)))
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

        if (this.props.type === 'Pattern') {
            console.log(values)
            return this.props
                .dispatch(updatePattern(values.pattern._id, values.pattern))
                .then((res) => console.log(res))
                .then(() => this.props.dispatch(setEditing(false)))
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

        if (this.props.type === 'User') {
            console.log(values)
            return this.props
                .dispatch(updateUser(values.user._user, values))
                .then((res) => console.log(res))
                .then(() => this.props.dispatch(setEditing(false)))
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

        let measureKeys = {
            chest: 'Chest',
            waist: 'Waist',
            hips: 'Hips',
            upperArm: 'Upper Arm',
            length: 'Length',
            wrist: 'Wrist'
        };

        if (this.props.style === 'Set In' || this.props.type === 'User') {
            measureKeys.armhole = 'Armhole';
        } else if (this.props.style === 'Raglan') {
            measureKeys.raglanDepth = 'Raglan Depth';
        } else {
            measureKeys.yokeDepth = true;
        }

        if (this.props.type !== 'User') {
            measureKeys.ease = 'Ease';
            measureKeys.gaugeRow = 'Gauge Row';
            measureKeys.gaugeStitches = 'Gauge Stitches';
            measureKeys.needles = 'Needles';
        }

        let editing;
        if (this.props.type === 'Pattern') {
            measureKeys.style = 'Style';
            editing = this.props.editPattern;
        }

        if (this.props.type === 'Project') {
            measureKeys.notes = 'Notes';
            editing = this.props.editProject;
        }

        if (this.props.type === 'User') {
            editing = this.props.editUser;
        }

        let contentList;
        let updateButton;
        if (!editing) {
            contentList = Object.keys(measureKeys).map((key, index) =>
                (
                    <li key={index} className='list-row'>
                        <label htmlFor={key} className='label'>{measureKeys[key]}:</label>
                        <p className='value'>{this.props.content[key]}</p>
                    </li>
                )
            )
            updateButton = (<li className='list-row button-row'>
                <button type='button' className='edit-button' onClick={() => this.setEditing(true, this.props.type)}>Edit</button>
            </li>)

        } else {
            contentList = Object.keys(measureKeys).map((key, index) =>
                (
                    <li key={index} className='list-row form-row'>
                        <Field
                            type='text'
                            parse={value => Number(value)}
                            label={measureKeys[key]}
                            name={key}
                            component={Input}
                        />
                    </li>
                )
            )
            updateButton = (<li className='list-row form-row button-row'>
                <button className='update-button' id={this.props.type} disabled={this.props.pristine || this.props.submitting}>Update</button>
            </li>)

        }

        return (
            <div className={this.props.type + `measurements`}>
                <h2>{this.props.type} Measurements</h2>
                <form className='measurements-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                    <ul className='list-wrapper'>
                        {contentList}
                        {formError}
                        {updateButton}
                    </ul>
                </form>
            </div >
        )
    }
}

const mapStateToProps = state => {

    return {
        // enableReinitialize: true,
        editProject: state.projectsReducer.editProject,
        editPattern: state.projectsReducer.editPattern,
        editUser: state.projectsReducer.editUser,
    }
}

Measurements = reduxForm({
    form: 'measurements',
    onSubmitFail: (errors, dispatch) => dispatch(focus('profileForm', Object.keys(errors)[0]))
})(Measurements);

export default connect(mapStateToProps)(Measurements);