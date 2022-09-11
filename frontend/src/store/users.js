import { ADD_GROUP } from "./groups";
import { SET_SESSION_USER } from "./session";

export const getUser = (id) => (state) => {
    if(!state.users) return null;
    // if(!id) return null;
    return state.users[id];
}

export const getUsers = () => (state) => {
    if(!state.users) return null;
    return state.users;
}

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = { ...state};

    switch(action.type) {
        case SET_SESSION_USER:
            console.log(action.payload);
            if(action.payload) newState[action.payload.id] = action.payload;
            return newState;
        case ADD_GROUP:
            newState[action.payload.owner.id] = action.payload.owner;
            return newState;
        default:
            return state;
    }

}
export default usersReducer;