export interface EventData {
    count: number,
    dateTime: string,
    duration: number,
    description: string,
    groupId: number,
    groupName?: string,
    id: number,
    online: "no" | "yes",
    title: string,
    venue: string
}

export interface EventFormData {
    id?: string, // only present when patching from old event
    groupId: string | undefined,
    title: string
    dateTime: Date,
    duration: number,
    description: string,
    online: "yes" | "no",
    venue: string
}

export interface GroupData {
    createdAt: string,
    description: string,
    id: number,
    location: string,
    memberLabel: string | null,
    name: string,
    ownerId: number,
    photoURL: string | null,
    updatedAt: string
}

export interface GroupFormData {
    location: string,
    keywordIds: Record<string, boolean>,
    name: string,
    description: string
    ownerId: string
    memberLabel?: string
}

export interface FullGroupData extends GroupData {
    isMember?: boolean,
    memberCount?: number
}

export interface GroupKeywordsData {
    groupId: number,
    id: number,
    keywordId: number
}

export interface MembershipData {
    createdAt: string,
    groupId: number,
    memberId: number
}

export interface UserData {
    email: string,
    id: number,
    location: string,
    name: string
    createdAt?: string,
    updatedAt?: string
}

export interface KeywordData {
    id: number,
    keyword: string
}

export interface UserGroupsData {
    joinedGroups: number[],
    otherGroups: number[],
    ownedGroups: number[],
}

export interface SessionData extends UserGroupsData {
    searchedEvents: Record<string, EventData>,
    user: UserData | null
}

export interface GroupsData extends UserGroupsData {
    groups: Record<string, FullGroupData>
}

export interface SignupData {
    attendeeId: number,
    eventId: number,
    id: number,
    rsvpStatus: "going" | "not",
}

export interface AppState {
    events: Record<string, EventData>,
    groupKeywords: Record<string, GroupKeywordsData>,
    groups: Record<string, FullGroupData>,
    keywords: Record<string, KeywordData>,
    memberships: Record<string, MembershipData>,
    session: SessionData,
    signups: Record<string, SignupData>,
    users: Record<string, UserData>
}

export type ResponseData<T> = {
    response: Response,
    data: T
}
