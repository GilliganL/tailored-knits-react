import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { length, matches, number } from '../validators';
import { setEditing } from '../actions/projects';
import { updateProject } from '../actions/projects';
import { updatePattern } from '../actions/patterns';
import { updateUser } from '../actions/users';
import Input from './input';

import './measurements.css';


const measurementLength = length({ min: 0, max: 5 });
// (needs own validator?)
//const matchesStyle = matches('Set In' || 'Yoke' || 'Raglan');

export class Measurements extends React.Component {

    // calculations - update values as form changes. Send info to server onchange? 

    setEditing(editing, type) {
        let editType = `edit${type}`
        this.props.dispatch(setEditing(editing, editType));
    }

    calculateGauge(measurement) {
        let rowKeys = ['length', 'armhole', 'raglanDepth', 'yokeDepth'];
        let stitches = 0;
        if (rowKeys.find(key => key === measurement)) {
            stitches = 2 * Math.round((this.props.content[measurement] * this.props.content.gaugeRow)/2);

        } else {
            stitches = 2 * Math.round((this.props.content[measurement] * this.props.content.gaugeStitches)/2);
        }
        return stitches;
    }

    onSubmit(values) {
        if (this.props.type === 'Project') {
            return this.props
                .dispatch(updateProject(values._id, values))
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

        if (this.props.style === 'Raglan') {
            measureKeys.raglanDepth = 'Raglan Depth';
        }

        if (this.props.style === 'Yoke') {
            measureKeys.yokeDepth = 'Yoke Depth';
        }

        if (this.props.type !== 'User') {
            measureKeys.ease = 'Ease';
            measureKeys.gaugeRow = 'Gauge Row';
            measureKeys.gaugeStitches = 'Gauge Stitches';
            specKeys.needles = 'Needles';
        }

        let editing;
        if (this.props.type === 'Pattern') {
            specKeys.style = 'Style';
            editing = this.props.editPattern;
        }

        if (this.props.type === 'Project') {
            specKeys.size = 'Size';
            specKeys.notes = 'Notes';
            editing = this.props.editProject;
        }

        if (this.props.type === 'User') {
            editing = this.props.editUser;
        }

        let displayForm;
        let contentList;
        let stitchesList;
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

            displayForm =
                (
                    <ul className='list-wrapper'>
                        <h3>Measurements</h3>
                        {contentList}
                        <li className='list-row button-row'>
                            <button type='button' id='edit-button' onClick={() => this.setEditing(true, this.props.type)}>
                                Edit
                            </button>
                        </li>
                    </ul>
                )
            if (this.props.type !== 'User') {
                let toCalculate = Object.keys(measureKeys).filter(key => !key.includes('gauge') && key !== 'ease')
                stitchesList = toCalculate.map((key, index) =>
                    (
                        <li key={index} className='list-row'>
                            <p className='value'>{this.calculateGauge(key)}</p>
                        </li>
                    )
                )
                stitchesList = <ul className='list-wrapper stitches-list'>
                    <h3>Stitches</h3>
                    {stitchesList}
                </ul>
            }


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
                        //  onChange={e => this.props.stitches[key] = e.target.value}
                        />
                    </li>
                )]
            )

            displayForm =
                (
                    <form className='measurements-form'
                        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                        <ul className='list-wrapper'>
                            <h3>Measurements</h3>
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
            <div className={this.props.type.toLowerCase() + `-measurements`}>
                <h2>{this.props.type}</h2>
                <div className='list-container'>
                    {displayForm}
                    {stitchesList}
                </div>
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
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    onSubmitFail: (errors, dispatch) => dispatch(focus('profileForm', Object.keys(errors)[0]))
})(Measurements);

export default connect(mapStateToProps)(Measurements);