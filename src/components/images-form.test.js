
import React from 'react';
import { shallow } from 'enzyme';
import ImagesForm from './images-form';
import { Provider } from 'react-redux';
import store from '../store';

describe('<ImagesForm />', () => {
	it('Renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<ImagesForm />
			</Provider>
		);
	});
});