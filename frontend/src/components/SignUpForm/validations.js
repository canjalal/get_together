/*

export function renderError(field, validateFn, setErrorMsg, defaultMsg = '') {

    const error = validateFn(field);

    setErrorMsg(!error ? defaultMsg : error);

    return !!error;

}

*/

export function validateEmail(email) {
    if(!email) {
        return "Email is required";
    } else if(!/^[A-Za-z]+[A-Za-z0-9._\-]*@[a-z][a-z0-9.-]*\.[a-z]{2,}$/.test(email)) {
        return "Email has invalid format";
    } else {
        return null;
    }
}

export function renderEmailError(email) {
    let field = document.getElementById("email");
    let caption = document.getElementById("email-caption");

    let error = validateEmail(email);
    
    if(!error) {
        caption.classList.remove("invalid");
        caption.innerHTML = `We'll use your email address to send you updates`
    } else {
        caption.classList.add("invalid");
        caption.innerHTML = `${error}`
    }
}


export function validateName(name) {
    if(!name) {
        return "Name is required"
    } else if(name.length < 3) {
            return "Name has to be at least 3 characters";
    } else {
        return null;
    }
}


export function validatePassword(password) {
    if(!password) {
        return "Password is required";
    } else if(password.length < 6) {
        return "Password has to be at least 6 characters";
    } else {
        return null;
    }
}

export function renderPasswordError(password) {
    let field = document.getElementById("password");
    let caption = document.getElementById("password-caption");

    let error = validatePassword(password);
    
    if(!error) {
        caption.classList.remove("invalid");
        caption.innerHTML = ``;
    } else {
        caption.classList.add("invalid");
        caption.innerHTML = `${error}`
    }
}

export function validateAge(age) {
    if(!age) {
        return "You need to be 18 or older to continue";
    } else {
        return null;
    }
}