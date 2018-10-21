import {
    PATTERNS_REQUEST,
    PATTERNS_SUCCESS,
    PATTERN_SUCCESS,
    PATTERNS_ERROR,
    SET_EDITING
} from '../actions/patterns';

const initialState = {
    patterns: '',
    pattern: '',
    editing: false,
    loading: false, 
    error: null
};

//add IS for measurements, pattern specs 

export default function reducer(state = initialState, action) {
    if (action.type === PATTERNS_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });
    } else if (action.type === PATTERNS_SUCCESS) {
        return Object.assign({}, state, {
            patterns: action.patterns,
            loading: false,
            error: null
        });
    } else if (action.type === PATTERN_SUCCESS) {
        return Object.assign({}, state, {
            pattern: action.pattern,
            loading: false,
            error: null
        });
    } else if (action.type === PATTERNS_ERROR) {
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