
import React from 'react';
import { shallow } from 'enzyme';
import Home from './home';
import { Provider } from 'react-redux';
import store from '../store';

describe('<Home />', () => {
	it('Renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<Home />
			</Provider>
		);
	});
});