import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer as formReducer } from 'redux-form';
import authReducer from './reducers/auth';
import { tailoredKnitsReducer } from './reducers';
import { API_BASE_URL } from './config';
import { loadAuthToken } from './local-storage';
import { setAuthToken, refreshAuthToken } from './actions/auth'

const store = createStore(
    combineReducers({
        form: formReducer,
        tailoredKnits: tailoredKnitsReducer,
        auth: authReducer
    }),
    applyMiddleware(thunk)
);

const authToken = loadAuthToken();
if (authToken) {
    store.dispatch(setAuthToken(authToken));
   store.dispatch(refreshAuthToken());
}

export default store;

