import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, focus, SubmissionError } from 'redux-form';
import { required, nonEmpty } from '../validators';
import { setEditing } from '../actions/projects';



export class Measurements extends React.Component {

    // calculations - update values as form changes. Send info to server onchange? 

    setEditing(editing, type) {
        let editType = `edit${type}`
        this.props.dispatch(setEditing(editing, editType));
    }

    onSubmit(values) {
        console.log(values)
        // return this.props
        //     .dispatch(updateUser(this.props.id, values))
        //     .then(() => this.props.dispatch(setEditing(false)))
    }

    render() {

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
                    <li key={index} className='list-row'>
                        <label htmlFor={key} className='label'>{measureKeys[key]}:</label>
                        <Field
                            type='text'
                            id={key}
                            name={key}
                            component='input'
                        />
                    </li>
                )
            )
            updateButton = (<li className='list-row button-row'><button className='update-button'>Update</button></li>)
        }

        return (
            <div className={this.props.type + `measurements`}>
                <h2>{this.props.type} Measurements</h2>
                <form className='measurements-form' onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                <ul className='list-wrapper'>
                    {contentList}
                    {updateButton}
                </ul>
                </form>
            </div >
        )
    }
}

const mapStateToProps = state => {

    return {
        enableReinitialize: true,
        editProject: state.projectsReducer.editProject,
        editPattern: state.projectsReducer.editPattern,
        editUser: state.projectsReducer.editUser,
    }
}

Measurements = reduxForm({
    form: 'measurements',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('measurements', Object.keys(errors)[0]))
})(Measurements);

export default connect(mapStateToProps)(Measurements);