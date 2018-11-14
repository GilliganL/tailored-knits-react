import { HEADER_ACTIVE, headerActive } from './tailored-knits';
  
describe('headerActive', () => {
	it('Should return the action', () => {
		const action = headerActive();
		expect(action.type).toEqual(HEADER_ACTIVE);
	});
});