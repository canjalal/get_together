export type NullableValidationFunction = (field: string) => string | null;
export type ValidationFunction = NonNullable<NullableValidationFunction>;

export interface EventData {
    count: number,
    dateTime: string,
    duration: number,
    groupId: number,
    id: number,
    online: "no" | "yes",
    title: string,
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

export interface SessionData {
    joinedGroups: number[],
    otherGroups: number[],
    ownedGroups: number[],
    searchedEvents: Record<string, EventData>,
    user: UserData | null
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
