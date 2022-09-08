import { ADD_GROUP } from "./groups";

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