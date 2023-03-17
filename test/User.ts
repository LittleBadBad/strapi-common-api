export interface UserInfo {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string
    updatedAt: string
}

export interface User {
    id: number;
    attributes: UserInfo
}
