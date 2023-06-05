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
    isMember: boolean,
    memberCount: number
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
}
