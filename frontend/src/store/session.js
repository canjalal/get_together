import csrfFetch, { storeCSRFToken } from "./csrf";

export const SET_SESSION_USER = 'session/SET_SESSION_USER';
export const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

export const getCurrentUser = (state) => state.session.user;

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
    const response = await csrfFetch('api/session', {
        method: 'DELETE'
    });

    storeCurrentUser(null);

    const data = await response.json();

    dispatch(removeSessionUser());
    return response;
}

export const restoreSession = () => async (dispatch) => {
    const response = await csrfFetch('api/session');
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

const initialState = {user: JSON.parse(sessionStorage.getItem('currentUser')) };

const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);

    switch(action.type) {
        case SET_SESSION_USER:
            return { ...state, user: action.payload };
        case REMOVE_SESSION_USER:
            return { ...state, user: null};
        default:
            return state;
    }

}
export default sessionReducer;