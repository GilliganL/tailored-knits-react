import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import MeasurementsForm from './measurements-form';

import { fetchProjectById, updateProject, deleteProject } from '../actions/projects';
import { fetchPatternById, updatePattern } from '../actions/patterns';
import { fetchUserById, updateUsers } from '../actions/users';


export class Measurements extends React.Component {

    componentDidMount() {
        if (this.props.type === 'Project') {
            this.props.dispatch(fetchProjectById(this.props.project.id));
        } else if (this.props.type === 'Pattern') {
            this.props.dispatch(fetchPatternById(this.props.pattern.id));
        } else {
            this.props.dispatch(fetchUserById(this.props.user.id));
        }
    }

    //calculations - update values as form changes. Send info to server onchange? 

    render() {
        let content;
        let editing;
        if (this.props.type === 'Project') {
            content = this.props.project;
            editing = this.props.editingProject;
        } else if (this.props.type === 'Pattern') {
            content = this.props.pattern;
            editing = this.props.editingPattern;
        } else {
            content = this.props.user;
            editing = this.props.editingUser;
        }

        if (editing) {
            return (
                <MeasurementsForm type={this.props.type} />
            )
        }

        let keys = Object.keys(content);
        let contentList = content.map((item, index) =>
            (
                <li key={index} className='list-row'>
                    <p className='list-label'>{keys[index]}</p>
                    <p className='list-value'>{content[keys[index]]}</p>
                </li>
            )
        )

        return (
            <div className={this.props.type} measurements >
                <h2>{this.props.type} Measurements</h2>
                <ul className='list-wrapper'>
                    {contentList}
                    <li className='list-row'>
                        <button>Update</button>
                    </li>
                </ul>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        project: state.projects.data,
        pattern: state.patterns.data,
        user: state.users.data,
        editingProject: state.projects.editing,
        editingPattern: state.patterns.editing,
        editingUser: state.users.editing
    }
}

export default requiresLogin()(connect(mapStateToProps)(Measurements));


