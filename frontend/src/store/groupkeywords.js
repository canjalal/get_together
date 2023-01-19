import { ADD_GROUP, DELETE_GROUP } from "./groups";

export const UPDATE_GKWORDS = 'groupKeywords/UPDATE_GKWORDS';

export const updateGroupKeywords = (gkeywords) => ({
    type: UPDATE_GKWORDS,
    payload: gkeywords
})

export const getGroupKeywords = (groupId) => (state) => {
    if(!state.groupKeywords) return null; // refactor it when you add entitites

    const groupsKeywords = {};
    for(let gkid in state.groupKeywords) {
        if(state.groupKeywords[gkid].groupId === Number(groupId)) {
            groupsKeywords[gkid] = state.groupKeywords[gkid];
        }
    }

    return groupsKeywords;

}

const groupKeywordsReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = {...state};
    switch(action.type) {
        case ADD_GROUP:
            for(let gkwId in action.payload.groupKeywords) {
                newState[gkwId] = action.payload.groupKeywords[gkwId];
            }
            return newState;
        case DELETE_GROUP:
            for(let gkw in newState) {
                if(newState[gkw].groupId === action.groupId) delete newState[gkw];
            }
            return newState;
        case UPDATE_GKWORDS:
            // debugger
            // ADD_GROUP is already called, so only need to delete keys that were removed
            for(let gkw in newState) {
                if(!action.payload[gkw]) delete newState[gkw];
            }
            return newState;
        default:
            return state;
    }
}
export default groupKeywordsReducer;