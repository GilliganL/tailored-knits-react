import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import { tailoredKnitsReducer } from './reducers';

export default createStore(
    combineReducers({
        form: formReducer,
        tailoredKnits: tailoredKnitsReducer
    }),
    applyMiddleware(thunk)
);