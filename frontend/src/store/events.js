import csrfFetch from "./csrf";
import { ADD_GROUP } from "./groups";

export const ADD_EVENT = 'events/ADD_EVENT';
export const DELETE_EVENT = 'events/DELETE_EVENT';

export const addEvent = (payload) => ({
    type: ADD_EVENT,
    payload
});

export const deleteEvent = (eventId) => ({
    type: DELETE_EVENT,
    eventId
});

export const getanEvent = (eventId) => (state) => {
    if(!state.events) return null;

    return state.events[eventId];
}

export const createEvent = (event) => async (dispatch) => {
    const response = await csrfFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(event)
    });

    const data = await response.json();

    dispatch(addEvent(data));

    return { response, data };
}

export const removeEvent = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    });

    dispatch(deleteEvent(eventId));
}

export const patchEvent = (event) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${event.id}`, {
        method: 'PATCH',
        body: JSON.stringify(event)
    });

    const data = await response.json();
    dispatch(addEvent(data));

    return { response, data };
}

export const fetchEvent = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`);

    const data = await response.json();
    dispatch(addEvent(data));

    return response;
}

export const getEventsfromGrp = (groupId) => (state) => {
    const events = [];

    for(let eid in state.events) {
        if(state.events[eid].groupId === Number(groupId)) events.push(state.events[eid]);
    }

    return events;
    
}

const eventsReducer = (state = {}, action) => {
    Object.freeze(state);

    const newState = {...state};

    switch(action.type) {
        case ADD_EVENT:
            newState[action.payload.event.id] = action.payload.event
            return newState;
        case DELETE_EVENT:
            delete newState[action.eventId];
            return newState;
        case ADD_GROUP:
            for(let eid in action.payload.events) {
                newState[eid] ||= action.payload.events[eid];
                // this won't update an event if it changed on the backend
            }
            return newState;
        default:
            return state;
    }
}
export default eventsReducer;