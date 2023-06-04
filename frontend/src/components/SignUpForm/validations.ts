import { NullableValidationFunction } from "../../types";



export const validateEmail: NullableValidationFunction = (email) => {
    if(!email) {
        return "Email is required";
    } else if(!/^[A-Za-z]+[A-Za-z0-9._\-]*@[a-z][a-z0-9.-]*\.[a-z]{2,}$/.test(email)) {
        return "Email has invalid format";
    } else {
        return null;
    }
}

export const validateName: NullableValidationFunction = (name) => {
    if(!name) {
        return "Name is required"
    } else if(name.length < 3) {
            return "Name has to be at least 3 characters";
    } else {
        return null;
    }
}


export const validatePassword: NullableValidationFunction = (password) => {
    if(!password) {
        return "Password is required";
    } else if(password.length < 6) {
        return "Password has to be at least 6 characters";
    } else {
        return null;
    }
}

export const validateAge: NullableValidationFunction = (age) => {
    if(!age) {
        return "You need to be 18 or older to continue";
    } else {
        return null;
    }
}
