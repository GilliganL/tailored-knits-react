
import React from 'react';
import { shallow } from 'enzyme';
import Measurements from './measurements';
import { Provider } from 'react-redux';
import store from '../store';

describe('<Measurements />', () => {
	it('Renders without crashing', () => {
		shallow(
            <Provider store={store}>
				<Measurements />
			</Provider>
        );
	});
});