import {SubmissionError} from 'redux-form';
import { API_BASE_URL} from '../config';
import { normalizeResponseErrors } from './utils';


export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const fetchUsersSuccess = data => ({
    type: FETCH_USERS_SUCCESS,
    data
});

export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';
export const fetchUsersError = error => ({
    type: FETCH_USERS_ERROR,
    error
});

export const SET_EDITING = 'SET_EDITING';
export const setEditing = editing => ({
    type: SET_EDITING,
    editing
});

export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => {
            return res.json()})
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

export const fetchUserById = (id) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((data) => dispatch(fetchUsersSuccess(data)))
    .catch(err => {
        dispatch(fetchUsersError(err));
    });
};

export const updateUser = (id, values) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
  
    return fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(values)
    })
    .then(res => normalizeResponseErrors(res))
    .then((data) => dispatch(fetchUsersSuccess(data)))
    .catch(err => {
        const {reason, message, location} = err;
        if (reason === 'ValidationError') {
            return Promise.reject(
                new SubmissionError({
                    [location]: message
                })
            );
        }
        //need to do both? Add else?
        dispatch(fetchUsersError(err));
    });
};
