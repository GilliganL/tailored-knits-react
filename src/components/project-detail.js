import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

import { fetchProjectById, updateProject, deleteProject } from '../actions/projects';
import { fetchPatternById, updatePattern } from '../actions/patterns';  

import './project-detail.css';

//fetchPattern or get from Project? If from project, will updating the pattern cause the project to re-render?)

export class ProjectDetail extends React.Component {

	componentDidMount() {
		this.props.dispatch(fetchProjectById(this.props.match.params));
	}

        //calculations
        
    render() {
        return (
		<div>
            <h1>Project Detail</h1>
			<section className='measurements-container'>
				<Measurements type='Project' />
				<Measurements type='Pattern' />
				<Measurements type='User' />
			</section>
		</div>
        )
    }
}

const mapStateToProps = state => {
	return {
		project: state.projects.data,
		pattern: state.patterns.data or state.projects.data.pattern,
		user: state.users.data
	}
}

export default requiresLogin()(connect(mapStateToProps)(ProjectDetail));