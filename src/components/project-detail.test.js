
import React from 'react';
import { shallow } from 'enzyme';
import ProjectDetail from './project-detail';
import { Provider } from 'react-redux';
import store from '../store';

describe('<ProjectDetail />', () => {
	it('Renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<ProjectDetail />
			</Provider>
		);
	});
});