
import React from 'react';
import { shallow } from 'enzyme';
import Stitches from './stitches';
import { Provider } from 'react-redux';
import store from '../store';

describe('<Stitches />', () => {
	it('Renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<Stitches />
			</Provider>
		);
	});
});