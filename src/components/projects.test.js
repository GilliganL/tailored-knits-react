
import React from 'react';
import { shallow } from 'enzyme';
import Projects from './projects';
import { Provider } from 'react-redux';
import store from '../store';

describe('<Projects />', () => {
	it('Renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<Projects />
			</Provider>
		);
	});
});