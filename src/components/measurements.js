import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { length, number } from '../validators';
import { setEditing } from '../actions/projects';
import { updateProject, fetchProjectById } from '../actions/projects';
import { updatePattern } from '../actions/patterns';
import { updateUser } from '../actions/users';
import Input from './input';

import './measurements.css';

const measurementLength = length({ min: 0, max: 5 });

export class Measurements extends React.Component {

    setEditing(editing, type) {
        let editType = `edit${type}`
        this.props.dispatch(setEditing(editing, editType));
    }

    onSubmit(values) {
        if (this.props.type === 'Project') {
            return this.props
                .dispatch(updateProject(values._id, values))
                .then(() => this.props.dispatch(fetchProjectById(this.props.id)))
                .then(() => this.setEditing(false, 'Project'))
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
            return this.props
                .dispatch(updatePattern(values._id, values))
                .then(() => this.props.dispatch(fetchProjectById(this.props.id)))
                .then(() => this.setEditing(false, 'Pattern'))
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
            return this.props
                .dispatch(updateUser(values._id, values))
                .then(() => this.props.dispatch(fetchProjectById(this.props.id)))
                .then(() => this.setEditing(false, 'User'))
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

        let specKeys = {};

        if (this.props.style === 'Set In' || this.props.type === 'User') {
            measureKeys.armhole = 'Armhole';
        }

        if ((this.props.style === 'Raglan' || this.props.style === 'Yoke') && this.props.type !== 'User') {
            measureKeys.raglanDepth = 'Raglan Depth';
        }

        if (this.props.style === 'Yoke' && this.props.type !== 'User') {
            measureKeys.yokeDepth = 'Yoke Depth';
        }

        if (this.props.type !== 'User') {
            measureKeys.ease = 'Ease';
            measureKeys.gaugeRow = 'Gauge Row';
            measureKeys.gaugeStitches = 'Gauge Stitches';
            specKeys.needles = 'Needles';
        }

        let editing;
        let style;

        if (this.props.type === 'Pattern') {
            style = 'Style';
            editing = this.props.editPattern;
        }

        if (this.props.type === 'Project') {
            specKeys.size = 'Size';
            editing = this.props.editProject;
        }

        if (this.props.type === 'User') {
            editing = this.props.editUser;
        }

        let displayContent;
        let contentList;

        if (!editing) {
            contentList = Object.keys(measureKeys).map((key, index) =>
                (
                    <li key={index} className='list-row'>
                        <label htmlFor={key} className='label'>{measureKeys[key]}:</label>
                        <p className='value'>{this.props.content[key]}</p>
                    </li>
                )
            )

            Object.keys(specKeys).map((key, index) =>
                contentList = [...contentList, (
                    <li key={index + 10} className='list-row'>
                        <label htmlFor={key} className='label'>{specKeys[key]}:</label>
                        <p className='value'>{this.props.content[key]}</p>
                    </li>
                )]
            )

            if (style) {
                contentList = [...contentList,
                (
                    <li key={20} className='list-row'>
                        <label htmlFor='style' className='label'>Style:</label>
                        <p className='value'>{this.props.content['style']}</p>
                    </li>
                )];
            }

            displayContent =
                (
                    <ul className='list-wrapper measurements-list'>
                        {contentList}
                        <li className='list-row button-row'>
                            <button type='button' id='edit-button' onClick={() => this.setEditing(true, this.props.type)}>
                                Edit
                            </button>
                        </li>
                    </ul>
                )
        } else {
            contentList = Object.keys(measureKeys).map((key, index) =>
                (
                    <li key={index} className='list-row form-row'>
                        <Field
                            type='number'
                            parse={value => Number(value)}
                            label={measureKeys[key]}
                            name={key}
                            component={Input}
                            validate={[measurementLength, number]}
                        />
                    </li>
                )
            )

            Object.keys(specKeys).map((key, index) =>
                contentList = [...contentList, (
                    <li key={index + 10} className='list-row form-row'>
                        <Field
                            type='text'
                            label={specKeys[key]}
                            name={key}
                            component={Input}
                        />
                    </li>
                )]
            )

            if (style) {
                contentList = [...contentList,
                (
                    <li key={20} className='list-row form-row'>
                        <Field
                            element='select'
                            label='Style'
                            name='style'
                            component={Input}
                        >
                            <option />
                            <option value='Set In'>Set In</option>
                            <option value='Raglan'>Raglan</option>
                            <option value='Yoke'>Yoke</option></Field>
                    </li>
                )];
            }

            displayContent =
                (
                    <form className='measurements-form'
                        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                        <ul className='form-wrapper measurements-form-list'>
                            {contentList}
                            {formError}
                            <li className='list-row form-row button-row'>
                                <button id='update-button'>Update</button>
                            </li>
                        </ul>
                    </form>
                )
        }

        return (
            <div className={this.props.type.toLowerCase() + `-measurements measurements-div`}>
                <h2 className='measurements-title'>{this.props.type} Measurements</h2>
                {displayContent}
            </div >
        )
    }
}

const mapStateToProps = state => {

    return {
        style: state.projectsReducer.project.pattern.style,
        editProject: state.projectsReducer.editProject,
        editPattern: state.projectsReducer.editPattern,
        editUser: state.projectsReducer.editUser,
    }
}

Measurements = reduxForm({
    form: 'measurements',
    onSubmitFail: (errors, dispatch) => dispatch(focus('measurements', Object.keys(errors)[0]))
})(Measurements);

export default connect(mapStateToProps)(Measurements);