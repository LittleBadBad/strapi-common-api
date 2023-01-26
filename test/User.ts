export interface UserInfo {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: number;
    attributes: UserInfo
}
