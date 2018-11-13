import {
    HEADER_ACTIVE
} from '../actions/tailored-knits';


const initialState = {
    navItems: ['Projects', 'Profile', 'Logout'],
    active: ''
};

export default function reducer(state = initialState, action) {
    if(action.type === HEADER_ACTIVE) {
        const active = state.active ? '' : 'active';
        return Object.assign({}, state, {
            active
        });
    }
    return state;
}

