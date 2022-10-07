import csrfFetch from "./csrf";
import { ADD_EVENT, DELETE_EVENT } from "./events";

export const ADD_SIGNUP = 'signup/ADD_SIGNUP';
export const REMOVE_SIGNUP = 'signup/REMOVE_SIGNUP';
// export const REMOVE_SIGNUPS = 'signup/REMOVE_SIGNUPS'; // have action DELETE_EVENT that will remove all signups


export const addSignup = (signup) => ({
    type: ADD_SIGNUP,
    payload: signup
})

export const removeSignup = (signupId) => ({
    type: REMOVE_SIGNUP,
    signupId
})

export const joinEvent = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}/signups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const data = await response.json();
    // debugger

        dispatch(addSignup(data));
}

export const changeRSVP = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/signups/${eventId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const data = await response.json();
    // debugger
        dispatch(addSignup(data));
}

export const getRSVPStatus = (attendeeId, eventId) => (state) => {
    // debugger
    let eventSignups = Object.values(state.signups).filter((su) => su.eventId === Number(eventId));
    return eventSignups.find((ele) => ele.attendeeId === Number(attendeeId))?.rsvpStatus;
}



const signupsReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = { ...state };
    switch(action.type) {
        case DELETE_EVENT:
            for(let signupId in newState) {
                if(newState[signupId].eventId === action.eventId) delete newState[signupId];
            }
            return newState;
        case ADD_SIGNUP:
            newState[action.payload.id] = action.payload;
            return newState;
        case ADD_EVENT:
            for(let su_id in action.payload.signups) {
                newState[su_id] ||= action.payload.signups[su_id];
            }
            return newState;
        case REMOVE_SIGNUP:
            delete newState[action.signupId];
            return newState;
        default:
            return state;

    }
}
export default signupsReducer;