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

export const getUsersfromGrp = (groupId) => (state) => {
    const members = [];
    // debugger
    if(!state.memberships || !state.users) return [];
    for(let membershipId in state.memberships) {
        let mb = state.memberships[membershipId];

        if(mb.groupId === Number(groupId)) members.push(state.users[mb.memberId]);

    }
    // if(members[0] === undefined) debugger

    return members;

}

export const getUsersfromEvent = (eventId) => (state) => {
    const attendees = [];
    // debugger
    if(!state.signups || !state.users) return [];
    for(let signupId in state.signups) {
        let su = state.signups[signupId];

        if(su.eventId === Number(eventId)) attendees.push(state.users[su.attendeeId]);

    }
    // if(members[0] === undefined) debugger

    return attendees;

}

export const SUSTAIN_CURRENT_USER = 'users/SUSTAIN_CURRENT_USER';


export const sustainCurrentUser = (user) => ({
    type: SUSTAIN_CURRENT_USER,
    payload: user
})


const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = { ...state};

    switch(action.type) {
        case SET_SESSION_USER:
            if(action.payload) newState[action.payload.id] = action.payload;
            return newState;
        case ADD_GROUP:
            for(let uid in action.payload.users) {
                newState[uid] ||= action.payload.users[uid];
            }
            // newState[action.payload.owner.id] = action.payload.owner;
            return newState;
        case SUSTAIN_CURRENT_USER:
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }

}
export default usersReducer;