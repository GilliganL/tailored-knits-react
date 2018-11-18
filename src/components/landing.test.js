
import React from 'react';
import { shallow } from 'enzyme';
import Landing from './landing';
import { Provider } from 'react-redux';
import store from '../store';

describe('<Landing />', () => {
	it('Renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<Landing />
			</Provider>
		);
	});
});