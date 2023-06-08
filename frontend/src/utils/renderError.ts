import { Dispatch } from "react";
import { ValidationFunction } from "./utils.types";
export function renderError(field: string, validateFn: ValidationFunction, setErrorMsg: Dispatch<string>, defaultMsg:string = ''):boolean {

    const error = validateFn(field);

    setErrorMsg(!error ? defaultMsg : error);

    return !!error;

}
