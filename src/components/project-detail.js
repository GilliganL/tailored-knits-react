import React from 'react';
import Measurements from './measurements';

import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import { fetchProjectById} from '../actions/projects';

import './project-detail.css';

export class ProjectDetail extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchProjectById(this.props.match.params.projectId))
    }

    render() {

        if(!this.props.project) {
            return (
                <div></div>
            )
        }

        return (
            <div>
                <h1>Project Detail</h1>
                <section className='measurements-container'>
                    <Measurements type='Pattern' content={this.props.project} style={this.props.pattern.style} />
                    <Measurements type='Project' content={this.props.project.pattern} style={this.props.pattern.style} />
                    <Measurements type='User' content={this.props.project.user} />
                </section>
            </div>
        )
    }
}

//can't do pattern.style here
const mapStateToProps = state => {
   const pattern = state.projectsReducer.project.pattern
    return {
        project: state.projectsReducer.project,
        pattern
    }
}

export default requiresLogin()(connect(mapStateToProps)(ProjectDetail));