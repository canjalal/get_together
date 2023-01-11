
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