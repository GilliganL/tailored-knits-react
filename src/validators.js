export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value => 
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const isTrimmed = value => 
    value.trim() === value ? undefined : 'Cannot start or end with spaces';

export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Must be ${length.min} characters or more long`;
    }
    if (length.max && value.length > length.max) {
        return `Must be ${length.max} characters or less`;
    }
};

export const matches = field => (value, allValues) => 
    field in allValues && value.trim() === allValues[field].trim() ?
        undefined :
        'Does not match';
    
export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;