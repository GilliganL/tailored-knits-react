
import React from 'react';
import { shallow } from 'enzyme';
import Notes from './notes';
import { Provider } from 'react-redux';
import store from '../store';

describe('<Notes />', () => {
	it('Renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<Notes />
			</Provider>
		);
	});
});