
import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from './signup-form';
import { Provider } from 'react-redux';
import store from '../store';

describe('<SignupForm />', () => {
	it('Renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<SignupForm />
			</Provider>
		);
	});
});