import { patternsReducer } from './index';

import {
    patternsRequest,
    patternsSuccess,
    patternSuccess,
    patternsError,
    setEditing
} from '../actions/patterns';

describe('authReducer', () => {

    const patterns1 = 'test auth token';
    const pattern1 = 'test user';
    const errorMessage = 'error message';

    it('Should set initial state when nothing is passed in', () => {
        const state = patternsReducer(undefined, { type: '_UNKNOWN' });
        expect(state).toEqual({
            patterns: '',
            pattern: '',
            editing: false,
            loading: false,
            error: null
        });
    });

    it('Should return the current state of an unknown action', () => {
        let currentState = {};
        const state = patternsReducer(currentState, { type: '_UNKNOWN' });
        expect(state).toBe(currentState);
    });


    describe('patternsRequest', () => {
        it('Should update loading to true', () => {
            let state;
            state = patternsReducer(state, patternsRequest());
            expect(state).toEqual({
                patterns: '',
                pattern: '',
                editing: false,
                loading: true,
                error: null
            });
        });
    });

    describe('patternsSuccess', () => {
        it('Should save patterns to state', () => {
            let state = ({
                patterns: '',
                pattern: '',
                editing: false,
                loading: true,
                error: null
            });
            state = patternsReducer(state, patternsSuccess(patterns1));
            expect(state).toEqual({
                patterns: patterns1,
                pattern: '',
                editing: false,
                loading: false,
                error: null
            });
        });
    });

    describe('patternSuccess', () => {
        it('Should save pattern to state', () => {
            let state = ({
                patterns: '',
                pattern: '',
                editing: false,
                loading: true,
                error: null
            });
            state = patternsReducer(state, patternSuccess(pattern1));
            expect(state).toEqual({
                patterns: '',
                pattern: pattern1,
                editing: false,
                loading: false,
                error: null
            });
        });
    });

    describe('patternsError', () => {
        it('Should save the error', () => {
            let state = ({
                patterns: '',
                pattern: '',
                editing: false,
                loading: true,
                error: null
            });
            state = patternsReducer(state, patternsError(errorMessage));
            expect(state).toEqual({
                patterns: '',
                pattern: '',
                editing: false,
                loading: false,
                error: errorMessage
            });
        });
    });

    describe('setEditing', () => {
        it('Should update editing in state', () => {
            let state = ({
                patterns: '',
                pattern: '',
                editing: false,
                loading: false,
                error: null
            });
            state = patternsReducer(state, setEditing(true));
            expect(state).toEqual({
                patterns: '',
                pattern: '',
                editing: true,
                loading: false,
                error: null
            });
        });
    });
});
