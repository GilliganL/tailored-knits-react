import { createStore } from 'redux';

import { tailoredKnitsReducer } from './reducers';

export default createStore(tailoredKnitsReducer);