export function renderError(field, validateFn, setErrorMsg, defaultMsg = '') {

    const error = validateFn(field);

    setErrorMsg(!error ? defaultMsg : error);

    return !!error;

}