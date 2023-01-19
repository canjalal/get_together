import csrfFetch, { storeCSRFToken } from "./csrf";

export const RECEIVE_KEYWORDS = 'keywords/RECEIVE_KEYWORDS';

export const getKeywords = (state) => Object.values(state.keywords);

const receiveKeywords = (keywords) => {
    return {
        type: RECEIVE_KEYWORDS,
        payload: keywords
    }
}


export const fetchKeywords = () => async (dispatch) => {
    
    const response = await csrfFetch('/api/keywords');

    const data = await response.json();

    dispatch(receiveKeywords(data));
}

const keywordReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_KEYWORDS:
            return { ...state, ...action.payload };
        default:
            return state;
    }

}
export default keywordReducer;