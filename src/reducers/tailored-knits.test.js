import { tailoredKnitsReducer } from './index';
import { headerActive } from '../actions/tailored-knits';

describe('tailoredKnitsReducer', () => {

    it('Should set initial state when nothing is passed in', () => {
        const state = tailoredKnitsReducer(undefined, { type: '_UNKNOWN' });
        expect(state).toEqual({
            navItems: ['Projects', 'Profile', 'Logout'],
            active: ''
        });
    });

    it('Should return the current state of an unknown action', () => {
        let currentState = {};
        const state = tailoredKnitsReducer(currentState, { type: '_UNKNOWN' });
        expect(state).toBe(currentState);
    });


    describe('headerActive', () => {
        it('Should change the header state to active', () => {
            let state = {
                navItems: ['Projects', 'Profile', 'Logout'],
                active: ''
            };
            state = tailoredKnitsReducer(state, headerActive());
            expect(state).toEqual({
                navItems: ['Projects', 'Profile', 'Logout'],
                active: 'active'
            });
        });
    });

    describe('headerActive', () => {
        it('Should change the header state to empty', () => {
            let state = {
                navItems: ['Projects', 'Profile', 'Logout'],
                active: 'active'
            };
            state = tailoredKnitsReducer(state, headerActive());
            expect(state).toEqual({
                navItems: ['Projects', 'Profile', 'Logout'],
                active: ''
            });
        });
    });
});

