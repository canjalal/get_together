import { NullableValidationFunction } from "../../types";

export const validateEmail:NullableValidationFunction = (email) => {
    if(!email) {
        return "Email is required";
    } else if(!/^[A-Za-z]+[A-Za-z0-9._\-]*@[a-z][a-z0-9.-]*\.[a-z]{2,}$/.test(email)) {
        return "Email has invalid format";
    } else {
        return null;
    }
}

export const validatePassword: NullableValidationFunction = (password) => {
    if(!password) {
        return "Password is required";
    } else {
        return null;
    }
}
