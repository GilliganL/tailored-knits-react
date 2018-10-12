import {
    FETCH_USERS_SUCCESS,
    FETCH_USERS_ERROR,
    SET_EDITING
} from '../actions/users';

const initialState = {
    data: '',
    editing: false,
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_USERS_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            error: null
        });
    } else if (action.type === FETCH_USERS_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    } else if (action.type === SET_EDITING) {
        return Object.assign({}, state, {
            editing: action.editing
        });
    }
    return state;
}
