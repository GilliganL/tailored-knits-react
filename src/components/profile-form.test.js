
import React from 'react';
import { shallow } from 'enzyme';
import ProfileForm from './profile-form';
import { Provider } from 'react-redux';
import store from '../store';

describe('<ProfileForm />', () => {
	it('Renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<ProfileForm />
			</Provider>
		);
	});
});