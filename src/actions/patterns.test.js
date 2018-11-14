import {
    PATTERNS_REQUEST, patternsRequest,
    PATTERNS_SUCCESS, patternsSuccess,
    PATTERN_SUCCESS, patternSuccess,
    PATTERNS_ERROR, patternsError,
    SET_EDITING, setEditing
} from './patterns';

describe('patternsRequest', () => {
    it('Should return the action', () => {
        const action = patternsRequest();
        expect(action.type).toEqual(PATTERNS_REQUEST);
    });
});

describe('patternsSuccess', () => {
    it('Should return the action', () => {
        const patterns = 'A pattern';
        const action = patternsSuccess(patterns);
        expect(action.type).toEqual(PATTERNS_SUCCESS);
        expect(action.patterns).toEqual(patterns);
    });
});

describe('patternSuccess', () => {
    it('Should return the action', () => {
        const pattern = 'A pattern';
        const action = patternSuccess(pattern);
        expect(action.type).toEqual(PATTERN_SUCCESS);
        expect(action.pattern).toEqual(pattern);
    });
});

describe('patternsError', () => {
    it('Should return the action', () => {
        const error = 'patterns error';
        const action = patternsError(error);
        expect(action.type).toEqual(PATTERNS_ERROR);
        expect(action.error).toEqual(error);
    });
});

describe('setEdting', () => {
    it('Should return the action', () => {
        const editing = true;
        const action = setEditing(editing);
        expect(action.type).toEqual(SET_EDITING);
        expect(action.editing).toEqual(editing);
    });
});
