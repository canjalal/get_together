import csrfFetch, { storeCSRFToken } from "./csrf";
import { ADD_SEARCHED_EVENTS } from "./events";
import { ADD_GROUPS, ADD_SEARCHED_GROUPS, DELETE_GROUP } from "./groups";

export const SET_SESSION_USER = 'session/SET_SESSION_USER';
export const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

export const getCurrentUser = (state) => state.session.user;

export const getGroupData = (state) => ({
    joinedGroups: state.session.joinedGroups,
    ownedGroups: state.session.ownedGroups,
    otherGroups: state.session.otherGroups
});

export const getSearchedGroupData = (state) => Object.values(state.session.searchedGroups);

export const getSearchedEventData = (state) => {
    if(!state.session?.searchedEvents) return [];
    const sortedEvents = Object.values(state.session.searchedEvents);
    sortedEvents.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    return sortedEvents;
}


const setSessionUser = (user) => {
    return {
        type: SET_SESSION_USER,
        payload: user
    }
}

export const removeSessionUser = () => {
    return {
        type: REMOVE_SESSION_USER
    }
}

export const signup = (user) => async (dispatch) => {
    const { name, email, location, password } = user;

    const response = await csrfFetch('api/users', {
        method: 'POST',
        body: JSON.stringify({name, email, location, password})
    });

    const data = await response.json();

    storeCurrentUser(data.user);

    dispatch(setSessionUser(data.user));

    return response;
}

export const login = (user ) => async (dispatch) => {

    const { email, password } = user;

    const response = await csrfFetch('api/session', {
        method: 'POST',
        body: JSON.stringify({email, password})
    });

    const data = await response.json();

    storeCurrentUser(data.user);

    dispatch(setSessionUser(data.user));

    return response;
}

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });

    storeCurrentUser(null);

    const data = await response.json();

    dispatch(removeSessionUser());
    return response;
}

export const restoreSession = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    storeCSRFToken(response);

    const data = await response.json();

    storeCurrentUser(data.user);

    dispatch(setSessionUser(data.user));
    return response;
}

function storeCurrentUser(user) {
    if(user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        sessionStorage.removeItem('currentUser');
    }
}

const initialState = {user: JSON.parse(sessionStorage.getItem('currentUser')), joinedGroups: [], ownedGroups: [], otherGroups: [] };

const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);

    switch(action.type) {
        case SET_SESSION_USER:
            return { ...state, user: action.payload };
        case REMOVE_SESSION_USER:
            return { ...state, user: null};
        case ADD_GROUPS: // this is only a partial add. Not all headers are gotten
            return { ...state,
                joinedGroups: action.payload.joinedGroups,
                ownedGroups: action.payload.ownedGroups,
                otherGroups: action.payload.otherGroups
            } // don't worry about when person joines /unjoins / deletes groups
               // thesee attributes are only for the home page and are refreshed there
        case ADD_SEARCHED_GROUPS:
            return { ...state,
                searchedGroups: action.payload.groups
            }
        case ADD_SEARCHED_EVENTS:
                return { ...state,
                    searchedEvents: action.payload.events
                }
        default:
            return state;
    }

}
export default sessionReducer;