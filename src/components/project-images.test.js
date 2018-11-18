
import React from 'react';
import { shallow } from 'enzyme';
import ProjectImages from './project-images';
import { Provider } from 'react-redux';
import store from '../store';

describe('<ProjectImages />', () => {
	it('Renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<ProjectImages />
			</Provider>
		);
	});
});