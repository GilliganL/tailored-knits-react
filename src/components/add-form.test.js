import React from 'react';
import { shallow } from 'enzyme';
import AddForm from './add-form';

describe('<AddForm />', () => {
	it('Renders without crashing', () => {
		shallow(<AddForm />);
	});
});