import { AppState, EventData, EventFormData, GroupData } from "../types";
import csrfFetch from "./csrf";
import { ADD_GROUP } from "./groups";
import { Dispatch, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

export enum EventActionTypes {
    ADD_EVENT = "events/ADD_EVENT",
    DELETE_EVENT = "events/DELETE_EVENT",
    ADD_SEARCHED_EVENTS = "events/ADD_SEARCHED_EVENTS"
}

type SortedEvents = {
    upcoming: EventData[],
    past: EventData[]
}

export interface EventPayload {
    event: EventData,
    group: GroupData
}

export interface SearchedEventPayload {
    events: Record<number, EventData>
}

export type AddEventAction = {
    type: typeof EventActionTypes.ADD_EVENT,
    payload: EventPayload
}

export const addEvent = (payload: EventPayload):AddEventAction => ({
    type: EventActionTypes.ADD_EVENT,
    payload
});


export type DeleteEventAction = {
    type: typeof EventActionTypes.DELETE_EVENT,
    eventId: string
}

export const deleteEvent = (eventId: string):DeleteEventAction => ({
    type: EventActionTypes.DELETE_EVENT,
    eventId
});

export type AddSearchedEventsAction = {
    type: typeof EventActionTypes.ADD_SEARCHED_EVENTS,
    payload: SearchedEventPayload
}

export const addSearchedEvents = (payload: SearchedEventPayload):AddSearchedEventsAction => ({
    type: EventActionTypes.ADD_SEARCHED_EVENTS,
    payload
})

export const getanEvent = (eventId: number) => (state: AppState) => {
    if(!state.events) return null;

    return state.events[eventId];
}

export const createEvent = (event: EventFormData):ThunkAction<Promise<{response: Response, data: EventPayload}>, AppState, unknown, AnyAction> => async (dispatch: Dispatch) => {
    const response = await csrfFetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(event)
    });

    const data = await response.json() as EventPayload;
    
    dispatch(addEvent(data));

    return { response, data };
}

export const searchEvents = (query: string):ThunkAction<Promise<{response: Response, data: SearchedEventPayload}>, AppState, unknown, AnyAction> => async dispatch => {

    const response = await csrfFetch('/api/events/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(query)
    });
    const data = await response.json() as SearchedEventPayload;

    dispatch(addSearchedEvents(data));

    return { response, data };
}

export const fetchWeeksEvents = (startDate: Date):ThunkAction<Promise<{response: Response, data: SearchedEventPayload}>, AppState, unknown, AnyAction> => async dispatch => {

    const response = await csrfFetch('/api/events/weekly', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({fecha: startDate})
    });
    const data = await response.json() as SearchedEventPayload;

    dispatch(addSearchedEvents(data));

    return { response, data};
}

export const removeEvent = (eventId: string):ThunkAction<Promise<void>, AppState, unknown, AnyAction> => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    });

    dispatch(deleteEvent(eventId));
}

export const patchEvent = (event: EventFormData):ThunkAction<Promise<{response: Response, data: EventPayload}>, AppState, unknown, AnyAction> => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${event.id}`, {
        method: 'PATCH',
        body: JSON.stringify(event)
    });

    const data = await response.json() as EventPayload;
    dispatch(addEvent(data));

    return { response, data };
}

// export const patchEventPhoto = (photo, eventId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/events/${eventId}`, { 
//         method: 'PATCH',
//         headers: {
//             'Content-Type': null

//         },
//         body: photo
//     });

//         const data = await response.json();
//         dispatch(addEvent(data));

//         return response;
// }

export const fetchEvent = (eventId:string):ThunkAction<Promise<Response>, AppState, unknown, AnyAction> => async (dispatch) => {
    const response = await csrfFetch(`/api/events/${eventId}`);

    const data = await response.json() as EventPayload;
    dispatch(addEvent(data));

    return response;
}

export const getEventsfromGrp = (groupId:string) => (state: AppState) => {
    const events: EventData[] = [];

    const rightnow = new Date();

    for(let eid in state.events) {
        if(state.events[eid].groupId === Number(groupId)) events.push(state.events[eid]);
    }

    events.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());

    const sortedEvents: SortedEvents = {
                        upcoming : [],
                          past : [],
                         };
    
    for(let event of events) {
        const category = new Date(event.dateTime).getTime() > rightnow.getTime() ? "upcoming" : "past";
        sortedEvents[category].push(event);
    }

    return sortedEvents;


}

export type Action =        | AddEventAction
                            | AddSearchedEventsAction
                            | DeleteEventAction;


const eventsReducer = (state:Record<string, EventData> = {}, action: Action): Record<string, EventData> => {
    Object.freeze(state);

    const newState = {...state};

    switch(action.type) {
        case EventActionTypes.ADD_EVENT:
            const key = action.payload.event.id.toString();
            newState[key] = action.payload.event
            return newState;
        case EventActionTypes.DELETE_EVENT:
            delete newState[action.eventId];
            return newState;
        case ADD_GROUP:
            for(let eid in action.payload.events) {
                newState[eid] = action.payload.events[eid];
            
            }
            return newState;
        case EventActionTypes.ADD_SEARCHED_EVENTS:
            for(let eid in action.payload.events) {
                newState[eid] ||= action.payload.events[eid];
            }
            return newState;
        default:
            return state;
    }
}
export default eventsReducer;
