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

export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const updateSuccess = () => ({
    type: UPDATE_SUCCESS
});

export const PROJECTS_ERROR = 'PROJECTS_ERROR';
export const projectsError = error => ({
    type: PROJECTS_ERROR,
    error
});

export const SET_EDITING = 'SET_EDITING';
export const setEditing = (editing, editType) => ({
    type: SET_EDITING,
    editing,
    editType
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

export const IMAGES_REQUEST = 'IMAGES_REQUEST';
export const imagesRequest = () => ({
    type: IMAGES_REQUEST
});

export const IMAGES_SUCCESS = 'IMAGES_SUCCESS';
export const imagesSuccess = image => ({
    type: IMAGES_SUCCESS,
    image
});

export const IMAGES_ERROR = 'IMAGES_ERROR';
export const imagesError = error => ({
    type: IMAGES_ERROR,
    error
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
        .then((project) => dispatch(imagesSuccess(project.images)))
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
    console.log(id, values)
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
        .then(() => dispatch(updateSuccess()))
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

export const handleImage = file => (dispatch, getState) => {
    const fileType = file.type;
    const validFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (validFileTypes.find(i => i === fileType) === undefined) {
        let err = {
            reason: 'ValidationError',
            message: 'Please choose a JPEG, PNG or GIF file',
            location: 'Image upload'
        }
        throw err;
    }

    if (file == null) {
        let err = {
            reason: 'ValidationError',
            message: 'No file selected',
            location: 'Image upload'
        }
        throw err;
    }
    const authToken = getState().authReducer.authToken;

    return getSignedRequest(file, authToken)
        .then((response) => uploadFile(response))
        .then((url) => dispatch(imagesSuccess(url)))
        .catch(err => {
            const { reason, message, location } = err;
            if (reason === 'ValidationError') {
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
}


export const getSignedRequest = (file, authToken) => {
 
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.open('GET', `${API_BASE_URL}/projects/sign-s3?file-name=${encodeURIComponent(file.name)}&file-type=${encodeURIComponent(file.type)}`);
        xhr.setRequestHeader('authorization', 'bearer ' + authToken);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    const responseObject = {
                        file,
                        signedRequest: response.signedRequest,
                        url: response.url
                    }
                    resolve(responseObject);
                } else {
                    let err = {
                        reason: 'ValidationError',
                        message: 'Something went wrong',
                        location: 'Getting signed request'
                    }
                    reject(err);
                }
            }
        };
        xhr.send();
    });
}

export const uploadFile = (requestObject) => {

    const {
        file,
        signedRequest,
        url
    } = requestObject;

    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(url)
                } else {
                    let err = {
                        reason: 'ValidationError',
                        message: 'Something went wrong',
                        location: 'File upload'
                    }
                    reject(err);
                }
            }
        };
        xhr.send(file);
    });
}
