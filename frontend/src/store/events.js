import csrfFetch from "./csrf";
import { ADD_GROUP } from "./groups";

export const ADD_EVENT = 'events/ADD_EVENT';
export const DELETE_EVENT = 'events/DELETE_EVENT';
export const ADD_SEARCHED_EVENTS = 'events/ADD_SEARCHED_EVENTS';

export const addEvent = (payload) => ({
    type: ADD_EVENT,
    payload
});

export const deleteEvent = (eventId) => ({
    type: DELETE_EVENT,
    eventId
});

export const addSearchedEvents = (payload) => ({
    type: ADD_SEARCHED_EVENTS,
    payload
})

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

export const searchEvents = (query) => async dispatch => {

    const response = await csrfFetch('/api/events/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(query)
    });
    const data = await response.json();

    dispatch(addSearchedEvents(data));

    return { response, data};
}

export const fetchWeeksEvents = (startDate) => async dispatch => {

    const response = await csrfFetch('/api/events/weekly', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({fecha: startDate})
    });
    const data = await response.json();

    dispatch(addSearchedEvents(data));

    return { response, data};
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

export const patchEventPhoto = (photo, eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`, { 
        method: 'PATCH',
        headers: {
            'Content-Type': false

        },
        body: photo
    });

        const data = await response.json();
        dispatch(addEvent(data));

        return response;
}

export const fetchEvent = (eventId) => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`);

    const data = await response.json();
    dispatch(addEvent(data));

    return response;
}

export const getEventsfromGrp = (groupId) => (state) => {
    const events = [];

    const rightnow = new Date();

    for(let eid in state.events) {
        if(state.events[eid].groupId === Number(groupId)) events.push(state.events[eid]);
    }

    events.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

    const sortedEvents = {"upcoming" : [],
                          "past" : [],
                         };
    
    for(let event of events) {
        sortedEvents[new Date(event.dateTime) > rightnow ? "upcoming" : "past"].push(event);
    }

    return sortedEvents;


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
                newState[eid] = action.payload.events[eid];
            
            }
            return newState;
        case ADD_SEARCHED_EVENTS:
            for(let eid in action.payload.events) {
                newState[eid] ||= action.payload.events[eid];
            }
            return newState;
        default:
            return state;
    }
}
export default eventsReducer;