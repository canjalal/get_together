import { ADD_GROUP } from "./groups";

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
        default:
            return state;
    }
}
export default groupKeywordsReducer;