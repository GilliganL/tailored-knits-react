import React from 'react';
import { shallow, mount } from 'enzyme';
import AddForm from './add-form';

describe('<AddForm />', () => {
	it('Renders without crashing', () => {
		shallow(<AddForm />);
	});

	it('Renders the add button initially', () => {
		const wrapper = shallow(<AddForm />);
		expect(wrapper.hasClass('add-button')).toEqual(true);
	});
	
	// it('Should render the form when editing', () => {
	// 	const wrapper = shallow(<AddForm />);
	// 	wrapper.instance().setEditing(true);
	// 	wrapper.update();
	// 	expect(wrapper.hasClass('add-project-container')).toEqual(true);
	// });
	
	// it('Should switch to editing when button is clicked', () => {
	// 	const wrapper = shallow(<AddForm />);
	// 	wrapper.simulate('click');
	// 	expect(wrapper.state('editing')).toEqual(true);
	// });
	
	// it('Should fire the createPattern callback on Submit', () => {
	// 	const callback = jest.fn();
	// 	const wrapper = mount(<AddForm createPattern={callback} />);
	// 	const name = 'pattern name';
	// 	const style = 'Raglan';
	// 	wrapper.instance().setEditing(true);
	// 	wrapper.update();
	// 	wrapper.find('input[name="patternName"]').instance().value = name;
	// 	wrapper.find('input[name="style"]').instance().value = style;
	// 	wrapper.simulate('submit');
	// 	expect(callback).toHaveBeenCalledWith(name, style);
	// });
	
	// it('Should not fire if the inputs are empty', () => {
	// 	const callback = jest.fn();
	// 	const wrapper = mount(<AddForm createPattern={callback} />);
	// 	wrapper.instance().setEditing(true);
	// 	wrapper.simulate('submit');
	// 	expect(callback).not.toHaveBeenCalled();
	// });
	
	// it('Should fire the createProject callback on Submit', () => {
	// 	const callback = jest.fn();
	// 	const wrapper = mount(<AddForm createProject={callback} />);
	// 	const values = {
	// 		patternName: 'pattern name',
	// 		style: 'Raglan',
	// 		pattern: '1234',
	// 		projectName: 'project name'
	// 	}
	// 	const name = 'pattern name';
	// 	const style = 'Raglan';
	// 	const projectName = 'project name';
	// 	const pattern = '1234';
	// 	wrapper.instance().setEditing(true);
	// 	wrapper.update();
	// 	wrapper.find('input[name="patternName"]').instance().value = name;
	// 	wrapper.find('input[name="style"]').instance().value = style;
	// 	wrapper.find('input[name="projectName"]').instance().value = projectName;
	// 	values.pattern = pattern;
	// 	wrapper.simulate('submit');
	// 	expect(callback).toHaveBeenCalledWith(values);
	// });
	
	// it('Should not fire if the inputs are empty', () => {
	// 	const callback = jest.fn();
	// 	const wrapper = mount(<AddForm createProject={callback} />);
	// 	wrapper.instance().setEditing(true);
	// 	wrapper.simulate('submit');
	// 	expect(callback).not.toHaveBeenCalled();
	// });
	
});