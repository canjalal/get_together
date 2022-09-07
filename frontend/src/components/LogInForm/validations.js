function validateEmail(email) {
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
        caption.innerHTML = ``
    } else {
        caption.classList.add("invalid");
        caption.innerHTML = `${error}`
    }
}

function validatePassword(password) {
    if(!password) {
        return "Password is required";
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
