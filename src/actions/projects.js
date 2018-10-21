import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const PROJECTS_REQUEST = 'PROJECTS_REQUEST';
export const projectsRequest = () => ({
    type: PROJECTS_REQUEST
});

export const PROJECTS_SUCCESS = 'PROJECTS_SUCCESS';
export const projectsSuccess = projects => ({
    type: PROJECTS_SUCCESS,
    projects
});

export const PROJECT_SUCCESS = 'PROJECT_SUCCESS';
export const projectSuccess = project => ({
    type: PROJECT_SUCCESS,
    project
});

export const PROJECTS_ERROR = 'PROJECTS_ERROR';
export const projectsError = error => ({
    type: PROJECTS_ERROR,
    error
});

export const SET_EDITING = 'SET_EDITING';
export const setEditing = editing => ({
    type: SET_EDITING,
    editing
});

export const ADD_PROJECT = 'ADD_PROJECT';
export const addProject = project => ({
    type: ADD_PROJECT,
    project
});

export const REMOVE_PROJECT = 'REMOVE_PROJECT';
export const removeProject = message => ({
    type: REMOVE_PROJECT,
    message
});

export const fetchProjects = (username) => (dispatch, getState) => {
    dispatch(projectsRequest());
    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/projects/${username}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(projects => dispatch(projectsSuccess(projects)))
        .catch(err => dispatch(projectsError(err)))
};

export const fetchProjectById = id => (dispatch, getState) => {
    dispatch(projectsRequest());
    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((project) => dispatch(projectSuccess(project)))
        .catch(err => dispatch(projectsError(err)))
};

export const createProject = values => (dispatch, getState) => {
    values.name = values.projectName;
    dispatch(projectsRequest());
    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(values)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(project => dispatch(addProject(project)))
        .catch(err => {
            const { reason, message, location } = err;
            if (reason === 'ValidationError') {
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
            dispatch(projectsError(err))
        });
}

export const updateProject = (id, values) => (dispatch, getState) => {
    dispatch(projectsRequest());
    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(values)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((project) => dispatch(projectSuccess(project)))
        .catch(err => {
            const { reason, message, location } = err;
            if (reason === 'ValidationError') {
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
            dispatch(projectsError(err))
        });
}

export const deleteProject = id => (dispatch, getState) => {
    dispatch(projectsRequest());
    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((res) => dispatch(removeProject(res.message)))
        .catch(err => dispatch(projectsError(err)))
};

