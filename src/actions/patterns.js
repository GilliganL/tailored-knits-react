import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';


export const PATTERNS_REQUEST = 'PATTERNS_REQUEST';
export const patternsRequest = () => ({
    type: PATTERNS_REQUEST
});

export const PATTERNS_SUCCESS = 'PATTERNS_SUCCESS';
export const patternsSuccess = patterns => ({
    type: PATTERNS_SUCCESS,
    patterns
});

export const PATTERN_SUCCESS = 'PATTERN_SUCCESS';
export const patternSuccess = pattern => ({
    type: PATTERN_SUCCESS,
    pattern
});

export const PATTERNS_ERROR = 'PATTERNS_ERROR';
export const patternsError = error => ({
    type: PATTERNS_ERROR,
    error
});

export const SET_EDITING = 'SET_EDITING';
export const setEditing = editing => ({
    type: SET_EDITING,
    editing
});

export const createPattern = (name, style) => (dispatch, getState) => {
    const patternObject = {
        name,
        style
    }
    dispatch(patternsRequest());
    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/patterns`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(patternObject)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((pattern) => dispatch(patternSuccess(pattern)))
        .catch(err => {
            const { reason, message, location } = err;
            if (reason === 'ValidationError') {
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
            dispatch(patternsError(err))
        });
}

export const fetchPatternById = id => (dispatch, getState) => {
    dispatch(patternsRequest());
    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/patterns/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((pattern) => dispatch(patternSuccess(pattern)))
        .catch(err => dispatch(patternsError(err)))
};

export const updatePattern = (id, values) => (dispatch, getState) => {
    dispatch(patternsRequest());
    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/patterns/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(values)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((pattern) => dispatch(patternSuccess(pattern)))
        .catch(err => {
            const { reason, message, location } = err;
            if (reason === 'ValidationError') {
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
            dispatch(patternsError(err))
        });
}
