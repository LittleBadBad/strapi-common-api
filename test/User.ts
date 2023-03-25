import {Comment} from "./Comment";

export interface UserInfo {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string
    updatedAt: string
    comments: { data: Comment[] }
}

export interface User {
    id: number;
    attributes: UserInfo
}
