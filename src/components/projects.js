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
            projects = this.props.projects.map((project, index) => {
                let style = index % 2 === 0 ? 'style1' : 'style2';
                return  (
                    <div key={index} className={'project-card ' + style}>
                        <div className='image'>
                            <img src={project.images[0]} alt={`${project.name} knit sweater`} />
                        </div>
                        <Link to={`/projects/${project._id}`}>
                            <h2>{project.name}</h2>
                        </Link>
                    </div>
                )
            })
        }

        return (
            <main role='main' id='main-projects'>
            <h1>{this.pluralize(this.props.username)} Projects</h1>
                <div className='projects-container'>
                    <section className='card-container'>
                        {projects}
                    </section>
                    <section className='add-form'>
                        <AddForm setEditing={editing => this.setEditing(editing)} editing={this.props.editing} />
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