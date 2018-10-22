import {
    PROJECTS_REQUEST,
    PROJECTS_SUCCESS,
    PROJECT_SUCCESS,
    PROJECTS_ERROR,
    SET_EDITING,
    ADD_PROJECT,
    REMOVE_PROJECT
} from '../actions/projects';

const initialState = {
    projects: '',
    project: '',
    editing: false,
    editProject: false,
    editPattern: false,
    editUser: false,
    loading: false, 
    message: '',
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === PROJECTS_REQUEST) {
        return Object.assign({}, state, {
            loading: true,
            error: null
        });
    } else if (action.type === PROJECTS_SUCCESS) {
        return Object.assign({}, state, {
            projects: action.projects,
            loading: false,
            error: null
        });
    } else if (action.type === PROJECT_SUCCESS) {
        return Object.assign({}, state, {
            project: action.project,
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
            editing: action.editing,
            [action.editType]: action.editing
        });
    } else if (action.type === ADD_PROJECT) {
        return Object.assign({}, state, {
            projects: [...state.projects, action.project],
            loading: false,
            error: null
        });
    } else if (action.type === REMOVE_PROJECT) {
        return Object.assign({}, state, {
            message: action.message,
            loading: false,
            error: null
        });
    }
    return state;
}