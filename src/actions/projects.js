import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const PROJECTS_REQUEST = 'PROJECTS_REQUEST';
export const projectsRequest = () => ({
    type: PROJECTS_REQUEST
});

export const PROJECTS_SUCCESS = 'PROJECTS_SUCCESS';
export const projectsSuccess = data => ({
    type: PROJECTS_SUCCESS,
    data
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

export const fetchProjects = () => (dispatch, getState) => {
    dispatch(projectsRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/projects`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(data => dispatch(projectsSuccess(data)))
        .catch(err => dispatch(projectsError(err)))
};

export const fetchProjectsById = id => (dispatch, getState) => {
    dispatch(projectsRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(projectsSuccess(data)))
        .catch(err => dispatch(projectsError(err)))
    //validation error on API for bad id
};

export const createProject = values => (dispatch, getState) => {
    dispatch(projectsRequest());
    const authToken = getState().auth.authToken;
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
        .then((data) => dispatch(projectsSuccess(data)))
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
    const authToken = getState().auth.authToken;
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
        .then((data) => dispatch(projectsSuccess(data)))
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
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => dispatch(projectsSuccess(data)))
        .catch(err => dispatch(projectsError(err)))
    //validation error on API for bad id
};