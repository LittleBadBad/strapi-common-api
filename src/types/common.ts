import {BaseType, ExtractArr, MergeAttrs, PickRelations, RelationKeys} from "./utils";


export type PickByType<T, Value> = {
    [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P]
}

export type PayloadMeta = {
    pagination?: ({ start: number, limit: number, } |
        { page: number, pageSize: number, pageCount: number }) &
        { total: number }
}

export interface UserAttrs {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface User<T = UserAttrs & Record<string, any>> {
    id: number;
    attributes: T
}

/**
 * type of data when post or put
 */
export type InputData<T extends BaseType> = MergeAttrs<T> & RelationData<T>

export type RelationData<T extends BaseType> = {
    [K in RelationKeys<T>]?:
    MergeAttrs<ExtractArr<PickRelations<T>[K]["data"]>>
}

export type Relation = number[] | { id: number }[]

export type RelationField = {
    connect?: Relation
    disconnect?: Relation
    set?: Relation
}

export type UserLogged<T = UserAttrs> = {
    user: T & { id: number },
    jwt: string
}

export type Payload<T> = {
    data: T
    meta: PayloadMeta
}
