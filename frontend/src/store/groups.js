import csrfFetch from "./csrf";
import { ADD_EVENT } from "./events";
import { updateGroupKeywords } from "./groupkeywords";

export const ADD_GROUP = 'groups/ADD_GROUP';

export const DELETE_GROUP = 'groups/DELETE_GROUP';

export const ADD_GROUPS = 'groups/ADD_GROUPS';

export const ADD_SEARCHED_GROUPS = 'groups/ADD_SEARCHED_GROUPS';

export const addGroup = (payload) => ({
    type: ADD_GROUP,
    payload // will have both a group: {} and a groupKeywords: {}
});


export const deleteGroup = (groupId) => ({
    type: DELETE_GROUP,
    groupId

});

export const addSearchedGroups = (payload) => ({
    type: ADD_SEARCHED_GROUPS,
    payload
})


export const getGroup = (groupId) => (state) => {
    if(!state.groups) return null; // refactor it when you add entitites

    return state.groups[groupId];

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


        return {response, data};
        // dispatch(addGroupKeywords(data.groupKeywords));
 // dispatch two regular action creators, one for group and one for group_keywords?
}

export const searchGroups = (query) => async dispatch => {

    const response = await csrfFetch('/api/groups/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(query)
    });
    const data = await response.json();
    console.log(data)

    dispatch(addSearchedGroups(data));

    return { response, data};
}

export const removeGroup = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'DELETE'
    });

    dispatch(deleteGroup(groupId));
    // clear keywords
}

export const patchGroupPhoto = (photo, groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`, { 
        method: 'PATCH',
        headers: {
            'Content-Type': null
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
}

export const fetchGroup = (groupId) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`);

    const data = await response.json();
    console.log(data);
    dispatch(addGroup(data));

    return response;
}

export const addGroups = (payload) => ({
    type: ADD_GROUPS,
    payload  
})

export const fetchGroups = () => async (dispatch) => {

    const response = await csrfFetch(`/api/groups`);

    const data = await response.json();
    console.log(data);
    dispatch(addGroups(data));

    return { response, data};

}

const groupReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = {...state};
    switch(action.type) {
        case ADD_EVENT:
            // intentional fall through
        case ADD_GROUP:
            newState[action.payload.group.id] = action.payload.group;
            return newState;
        case DELETE_GROUP:
            delete newState[action.groupId];
            return newState;

        case ADD_SEARCHED_GROUPS: // intentional fall-through
        case ADD_GROUPS: // this is only a partial add. Not all headers are gotten
            for(let gid in action.payload.groups) {
                newState[gid] ||= action.payload.groups[gid];
            }
            return newState;
        default:
            return state;
    }
}
export default groupReducer;
