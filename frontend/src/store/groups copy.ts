
// import { EventActionTypes } from "./events";
import { updateGroupKeywords } from "./groupkeywords";
import { AppState, EventData, FullGroupData, GroupData, GroupFormData, GroupKeywordsData, GroupsData, MembershipData, ResponseData, UserData } from "../types";
import csrfFetch from "./csrf";
import { Dispatch, AnyAction } from "redux";
import { ThunkAction, ThunkActionDispatch } from "redux-thunk";
import { Action, EventActionTypes } from "./events copy";

export enum GroupActionTypes {
    ADD_GROUP = 'groups/ADD_GROUP',
    DELETE_GROUP = 'groups/DELETE_GROUP',
    ADD_GROUPS = 'groups/ADD_GROUPS',
    ADD_SEARCHED_GROUPS = 'groups/ADD_SEARCHED_GROUPS'
}

export interface GroupPayload {
    events: Record<string, EventData>,
    group: FullGroupData,
    groupKeywords: Record<string, GroupKeywordsData>,
    memberships: Record<string, MembershipData>,
    users: Record<string, UserData>
}

export interface LoggedOutGroupPayload {
    users: Record<string, UserData>
}

export interface SearchedGroupPayload {
    groups: Record<number, GroupData>
}

export type AddGroupAction = {
    type: typeof GroupActionTypes.ADD_GROUP,
    payload: GroupPayload
}

export const addGroup = (payload: GroupPayload):AddGroupAction => ({
    type: GroupActionTypes.ADD_GROUP,
    payload // will have both a group: {} and a groupKeywords: {}
});

export type DeleteGroupAction = {
    type: typeof GroupActionTypes.DELETE_GROUP,
    groupId: string
}

export const deleteGroup = (groupId: string):DeleteGroupAction => ({
    type: GroupActionTypes.DELETE_GROUP,
    groupId
});

export type AddSearchedGroupsAction = {
    type: typeof GroupActionTypes.ADD_SEARCHED_GROUPS,
    payload: SearchedGroupPayload
}

export const addSearchedGroups = (payload: SearchedGroupPayload):AddSearchedGroupsAction => ({
    type: GroupActionTypes.ADD_SEARCHED_GROUPS,
    payload
})


export const getGroup = (groupId:string) => (state: AppState):FullGroupData | null => {
    if(!state.groups) return null; // refactor it when you add entitites

    return state.groups[groupId];
}

export const createGroup = (group: GroupFormData):ThunkAction<Promise<ResponseData<GroupPayload>>, AppState, unknown, AnyAction> => async (dispatch: Dispatch) => {
    const response = await csrfFetch('/api/groups', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(group)
    });

        const data = await response.json() as GroupPayload;
        dispatch(addGroup(data));


        return {response, data};
        // dispatch(addGroupKeywords(data.groupKeywords));
 // dispatch two regular action creators, one for group and one for group_keywords?
}

export const searchGroups = (query:string):ThunkAction<Promise<ResponseData<SearchedGroupPayload>>, AppState, unknown, AnyAction> => async dispatch => {

    const response = await csrfFetch('/api/groups/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(query)
    });
    const data = await response.json() as SearchedGroupPayload;

    dispatch(addSearchedGroups(data));

    return { response, data};
}

export const removeGroup = (groupId: string):ThunkAction<Promise<void>, AppState, unknown, AnyAction> => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method: 'DELETE'
    });

    dispatch(deleteGroup(groupId));
    // clear keywords
}

export const patchGroupPhoto = (photo:FormData, groupId:string):ThunkAction<Promise<Response>, AppState, unknown, AnyAction> => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`, { 
        method: 'PATCH',
        headers: {
            'Content-Type': null
            // 'Accept': 'image/*',
            // 'Process-Data': false
        },
        body: photo
    });

        const data = await response.json() as GroupPayload;
        dispatch(addGroup(data));

        return response;
        // dispatch(addGroupKeywords(data.groupKeywords));
 // dispatch two regular action creators, one for group and one for group_keywords?
}

export const patchGroup = (fdata: GroupFormData, groupId: string):ThunkAction<Promise<Response>, AppState, unknown, AnyAction> => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`, { 
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(fdata)
    });

        const data = await response.json() as GroupPayload;
        
        dispatch(addGroup(data));
        dispatch(updateGroupKeywords(data.groupKeywords));

        return response;
}

export const fetchGroup = (groupId: string):ThunkAction<Promise<Response>, AppState, unknown, AnyAction> => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${groupId}`);

    const data = await response.json() as GroupPayload;
    dispatch(addGroup(data));

    return response;
}

export type AddGroupsAction  = {
    type: typeof GroupActionTypes.ADD_GROUPS,
    payload: GroupsData
}

export const addGroups = (payload: GroupsData) => ({
    type: GroupActionTypes.ADD_GROUPS,
    payload  
})

export const fetchGroups = ():ThunkAction<Promise<ResponseData<GroupsData>>, AppState, unknown, AnyAction> => async (dispatch) => {

    const response = await csrfFetch(`/api/groups`);

    const data = await response.json() as GroupsData;
    dispatch(addGroups(data));

    return { response, data};

}

type GroupState = Record<string, FullGroupData>;

const groupReducer = (state: GroupState = {}, action: Action):GroupState => {
    Object.freeze(state);
    const newState = {...state};
    switch(action.type) {
        case EventActionTypes.ADD_EVENT:
            // intentional fall through
        case GroupActionTypes.ADD_GROUP:
            newState[action.payload.group.id] = action.payload.group;
            return newState;
        case GroupActionTypes.DELETE_GROUP:
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
