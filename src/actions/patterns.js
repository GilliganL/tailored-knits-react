import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';


export const PATTERNS_REQUEST = 'PATTERNS_REQUEST';
export const patternsRequest = () => ({
    type: PATTERNS_REQUEST
});

export const PATTERNS_SUCCESS = 'PATTERNS_SUCCESS';
export const patternsSuccess = data => ({
    type: PATTERNS_SUCCESS,
    data
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

export const createPattern = name => (dispatch, getState) => {
    const patternObject = {
        name
    }
    dispatch(patternsRequest());
    const authToken = getState().auth.authToken;
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
        .then((data) => dispatch(patternsSuccess(data)))
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