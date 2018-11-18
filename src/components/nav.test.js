
import React from 'react';
import { shallow } from 'enzyme';
import Nav from './nav';
import { Provider } from 'react-redux';
import store from '../store';

describe('<Nav />', () => {
	it('Renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<Nav />
			</Provider>
		);
	});
});