import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import { fetchProjects, setEditing } from '../actions/projects';

import AddForm from './add-form';

import './projects.css';

export class Projects extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProjects(this.props.username));
    }

    pluralize(username) {
        if (this.props.projects.length > 1) {
            return username.endsWith('s') ? username + '\'' : username + '\'s';
        }
        return username;
    }

    setEditing(editing) {
        this.props.dispatch(setEditing(editing))
    }

    render() {
        let projects;
        if (this.props.projects && !this.props.loading) {
            projects = this.props.projects.map((project, index) =>
                (<div key={index} className='project-card'>
                    <h3><Link to={`/projects/${project._id}`}>{project.name}</Link></h3>
                    <p>{project.pattern.name}</p>
                    <p>{project.size}</p>
                    <p>{project.pattern.style}</p>
                </div>)
            )
        }

        return (
            <main role='main' id='main-projects'>
                <div className='projects-container'>
                    <h1>{this.pluralize(this.props.username)} Projects</h1>
                    <section className='card-container'>
                        {projects}
                        <div className='project-card'>
                            <AddForm setEditing={editing => this.setEditing(editing)} editing={this.props.editing} />
                        </div>
                    </section>
                </div>
            </main>
        );
    }

}

const mapStateToProps = state => {
    const { currentUser } = state.authReducer;
    return {
        username: currentUser.username,
        name: currentUser.fullName,
        projects: state.projectsReducer.projects,
        editing: state.projectsReducer.editing,
        loading: state.projectsReducer.loading
    }
}

export default requiresLogin()(connect(mapStateToProps)(Projects));