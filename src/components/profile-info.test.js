
import React from 'react';
import { shallow } from 'enzyme';
import ProfileInfo from './profile-info';
import { Provider } from 'react-redux';
import store from '../store';

describe('<ProfileInfo />', () => {
	it('Renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<ProfileInfo />
			</Provider>
		);
	});
});