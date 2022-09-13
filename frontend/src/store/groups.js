import csrfFetch from "./csrf";
import { updateGroupKeywords } from "./groupkeywords";

export const ADD_GROUP = 'groups/ADD_GROUP';

export const DELETE_GROUP = 'groups/DELETE_GROUP';

export const addGroup = (payload) => ({
    type: ADD_GROUP,
    payload // will have both a group: {} and a groupKeywords: {}
});


export const deleteGroup = (groupId) => (state) => ({
    type: DELETE_GROUP,
    groupId

});


export const getGroup = (groupId) => (state) => {
    if(!state.groups) return null; // refactor it when you add entitites

    return state.groups[groupId];

}
export const getGroupOwner = (groupId) => (state) => {
    if(!state.users) return null;
    if(!state.users[state.groups[groupId]]) return null;
    return state.users[state.groups[groupId].ownerId];
}


export const createGroup = (group) => async (dispatch) => {
    const response = await csrfFetch('/api/groups', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(group)
    });

        const data = await response.json();
        dispatch(addGroup(data));

        return response;
        // dispatch(addGroupKeywords(data.groupKeywords));
 // dispatch two regular action creators, one for group and one for group_keywords?
}

export const removeGroup = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    dispatch(deleteGroup(groupId));
    // clear keywords
}

export const patchGroupPhoto = (photo, groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`, { 
        method: 'PATCH',
        headers: {
            'Content-Type': false
            // 'Accept': 'image/*',
            // 'Process-Data': false
        },
        body: photo
    });

        const data = await response.json();
        dispatch(addGroup(data));

        return response;
        // dispatch(addGroupKeywords(data.groupKeywords));
 // dispatch two regular action creators, one for group and one for group_keywords?
}

export const patchGroup = (fdata, groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`, { 
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(fdata)
    });

        const data = await response.json();
        dispatch(addGroup(data));
        dispatch(updateGroupKeywords(data.groupKeywords));

        return response;
        // dispatch(addGroupKeywords(data.groupKeywords));
 // dispatch two regular action creators, one for group and one for group_keywords?
}

export const fetchGroup = (groupId) => async (dispatch) => {
    // debugger
    const response = await csrfFetch(`/api/groups/${groupId}`);

    const data = await response.json();
    dispatch(addGroup(data));

    return response;
}

const groupReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = {...state};
    switch(action.type) {
        case ADD_GROUP:
            newState[action.payload.group.id] = action.payload.group;
            return newState;
        case DELETE_GROUP:
            delete newState[action.groupId];
            return newState;
        default:
            return state;
    }
}
export default groupReducer;