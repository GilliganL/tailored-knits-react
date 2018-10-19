import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer as formReducer } from 'redux-form';
import { tailoredKnitsReducer, 
         authReducer, 
         usersReducer, 
         projectsReducer, 
         patternsReducer } from './reducers';

import { loadAuthToken } from './local-storage';
import { setAuthToken, refreshAuthToken } from './actions/auth'

const store = createStore(
    combineReducers({
        form: formReducer,
        tailoredKnits: tailoredKnitsReducer,
        auth: authReducer,
        users: usersReducer,
        projectsReducer,
        patterns: patternsReducer
    }),
    applyMiddleware(thunk)
);

const authToken = loadAuthToken();
if (authToken) {
    store.dispatch(setAuthToken(authToken));
   store.dispatch(refreshAuthToken());
}

export default store;

