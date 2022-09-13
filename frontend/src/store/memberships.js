export const ADD_MEMBERSHIP = 'memberships/ADD_MEMBERSHIP';
export const REMOVE_MEMBERSHIP = 'memberships/REMOVE_MEMBERSHIP';

export const addMembership = (membership) => ({
    type: ADD_MEMBERSHIP,
    payload: membership
})

export const removeMembership = (membershipId) => ({
    type: REMOVE_MEMBERSHIP,
    membershipId
})

export const joinGroup = (groupId, userId) => async (dispatch) => {
    
}

export const RECEIVE_MEMBERSHIPS = 'memberships/RECEIVE_MEMBERSHIPS';



const membershipsReducer = (state = {}, action) => {
    Object.freeze(state);
    const newState = { ...state };
    switch(action.type) {
        case DELETE_GROUP:
            for(let membership in newState) {
                if(newState[membership.groupId] === action.groupId) delete newState[memberships];
            }
            return newState;
        case 
    }
}