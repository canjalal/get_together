import csrfFetch from "./csrf";

export const ADD_GROUP = 'groups/ADD_GROUP';

export const addGroup = (payload) => ({
    type: ADD_GROUP,
    payload // will have both a group: {} and a groupKeywords: {}
});

export const createGroup = (group) => async (dispatch) => {
    const response = await csrfFetch('/api/groups', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(group)
    });

    if(response.ok) {
        const data = await response.json();
        dispatch(addGroup(data));
        // dispatch(addGroupKeywords(data.groupKeywords));
    }
 // dispatch two regular action creators, one for group and one for group_keywords?
}

const groupReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = {...state};
    switch(action.type) {
        case ADD_GROUP:
            newState[action.payload.group.id] = action.payload.group;
            return newState;
        default:
            return state;
    }
}
export default groupReducer;