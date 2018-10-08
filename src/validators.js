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

//add matching validator for requests by id?