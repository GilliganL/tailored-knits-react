import {SubmissionError} from 'redux-form';
import { API_BASE_URL} from '../config';
import { normalizeResponseErrors } from './utils';

export const USERS_REQUEST = 'USERS_REQUEST';
export const usersRequest = () => ({
    type: USERS_REQUEST
});

export const USERS_SUCCESS = 'USERS_SUCCESS';
export const usersSuccess = user => ({
    type: USERS_SUCCESS,
    user
});

export const USERS_ERROR = 'USERS_ERROR';
export const usersError = error => ({
    type: USERS_ERROR,
    error
});

export const SET_EDITING = 'SET_EDITING';
export const setEditing = editing => ({
    type: SET_EDITING,
    editing
});

export const registerUser = user => dispatch => {
    dispatch(usersRequest());
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(user => dispatch(usersSuccess(user)))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                console.log(err)
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
         dispatch(usersError(err));
            return Promise.reject(
                new SubmissionError({
                    _error: 'Error submitting message'
                })
            );
        });
};

export const fetchUserById = (id) => (dispatch, getState) => {
    dispatch(usersRequest());
    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((user) => dispatch(usersSuccess(user)))
    .catch(err => {
        const {reason, message, location} = err;
        if (reason === 'ValidationError') {
            return Promise.reject(
                new SubmissionError({
                    [location]: message
                })
            );
        }
        dispatch(usersError(err));
        return Promise.reject(
            new SubmissionError({
                _error: 'Error submitting message'
            })
        );
    });
};

export const updateUser = (id, values) => (dispatch, getState) => {
    dispatch(usersRequest());
    const authToken = getState().authReducer.authToken;
    return fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(values)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(user => dispatch(usersSuccess(user)))
    .catch(err => {
        const {reason, message, location} = err;
        if (reason === 'ValidationError') {
            return Promise.reject(
                new SubmissionError({
                    [location]: message
                })
            );
        }
        dispatch(usersError(err));
        return Promise.reject(
            new SubmissionError({
                _error: 'Error submitting message'
            })
        );
    });
};
