import {
    PROJECTS_REQUEST,
    PROJECTS_SUCCESS,
    PROJECTS_ERROR,
    SET_EDITING
} from '../actions/projects';

const initialState = {
    data: '',
    editing: false,
    loading: false, 
    error: null
};

//add IS for measurements, pattern specs 

export default function reducer(state = initialState, action) {
    if (action.type === PROJECTS_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });
    } else if (action.type === PROJECTS_SUCCESS) {
        return Object.assign({}, state, {
            data: action.data,
            loading: false,
            error: null
        });
    } else if (action.type === PROJECTS_ERROR) {
        return Object.assign({}, state, {
            loading: false,
            error: action.error
        });
    } else if (action.type === SET_EDITING) {
        return Object.assign({}, state, {
            editing: action.editing
        });
    }
    return state;
}