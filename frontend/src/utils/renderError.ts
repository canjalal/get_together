import { ValidationFunction } from "../types";
export function renderError(field: string, validateFn: ValidationFunction, setErrorMsg: React.Dispatch<React.SetStateAction<string>>, defaultMsg:string = ''):boolean {

    const error = validateFn(field);

    setErrorMsg(!error ? defaultMsg : error);

    return !!error;

}
