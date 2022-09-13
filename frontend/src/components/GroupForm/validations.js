
export function validateGrpName(name) {
    if(name.length < 5) {
        return "Try adding a bit more to your name."
    } else if (name.length > 60) {
        return "That name is a little too long. Try something shorter."
    }
}

export function validateDescription(description) {
    if(description.length === 0) {
        return "Required";
    } else if(description.length < 50) {
        return "Please write at least 50 characters"
    }
}

export function renderGrpNameError(name) {
    let field = document.getElementById("grpName");
    let caption = document.getElementById("grpName-caption");

    let error = validateGrpName(name);
    
    if(!error) {
        caption.classList.remove("invalid");
        caption.innerHTML = ``;
    } else {
        caption.classList.add("invalid");
        caption.innerHTML = `${error}`
    }

    return !!error;
}

export function renderDescriptionError(description) {
    let field = document.getElementById("grp-description");
    let caption = document.getElementById("description-caption");

    let error = validateDescription(description);
    
    if(!error) {
        caption.classList.remove("invalid");
        caption.innerHTML = ``;
    } else {
        caption.classList.add("invalid");
        caption.innerHTML = `${error}`
    }

    return !!error;
}