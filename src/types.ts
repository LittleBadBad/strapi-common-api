export type Locale = 'ar' |
    'fr' |
    'cs' |
    'de' |
    'dk' |
    'es' |
    'he' |
    'id' |
    'it' |
    'ja' |
    'ko' |
    'ms' |
    'nl' |
    'no' |
    'pl' |
    'pt-BR' |
    'pt' |
    'ru' |
    'sk' |
    'sv' |
    'th' |
    'tr' |
    'uk' |
    'vi' |
    'zh-Hans' |
    'zh' |
    'all'

export type BaseType = { id: number, attributes: Record<string, any | { data: any }> }

export type PickByType<T, Value> = {
    [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P]
}

export type OmitByType<T, Value> = {
    [P in keyof T as T[P] extends Value | undefined ? never : P]: T[P]
}

export type OmitOther<T extends Record<string, any | { data: any }>> = OmitByType<T, { data: any }>
export type PickOther<T extends Record<string, any | { data: any }>> = OmitByType<T, string | number | boolean>

export type MergeAttrs<T extends BaseType> = {
    [K in keyof OmitOther<T["attributes"]> | "id"]?:
    K extends "id" ? number : T["attributes"][K]
}
export type WhereParams<T> = {
    [K in keyof T]?: T[K] | T[K][] | AttributeOperators<T, K>;
}

type LogicalOperators<T extends BaseType> = {
    $and?: Filters<T>[];
    $or?: Filters<T>[];
    $not?: Filters<T>;
};

type AttributeOperators<T, K extends keyof T> = {
    $eq?: T[K] | Array<T[K]>;
    $ne?: T[K] | Array<T[K]>;
    $in?: T[K][];
    $notIn?: T[K][];
    $lt?: T[K];
    $lte?: T[K];
    $gt?: T[K];
    $gte?: T[K];
    $between?: [T[K], T[K]];
    $contains?: T[K];
    $notContains?: T[K];
    $containsi?: T[K];
    $notContainsi?: T[K];
    $startsWith?: T[K];
    $endsWith?: T[K];
    $null?: boolean;
    $notNull?: boolean;
};

export type CommonFilters<T extends BaseType> =
    WhereParams<OmitOther<MergeAttrs<T>>>

export type FiltersWithoutLogical<T extends BaseType> =
    CommonFilters<T> & RelationFilters<T>

export type RelationFilters<T extends BaseType> = {
    [K in keyof PickOther<T["attributes"]>]?:
    Filters<ExtractArr<PickOther<T["attributes"]>[K]["data"]>>
}

export type Filters<T extends BaseType> =
    FiltersWithoutLogical<T> & LogicalOperators<T>

type ExtractArr<T> = T extends Array<any> ? T[number] : T

type Sortables<T> = {
    // check sortable
    [P in keyof T]: P;
}[keyof T];

type Direction = 'asc' | 'ASC' | 'DESC' | 'desc';

export type Sort<T extends BaseType> =
    Sortables<MergeAttrs<T>>
    | Sortables<MergeAttrs<T>>[]
    | { [K in Sortables<MergeAttrs<T>>]?: Direction }
    | { [K in Sortables<MergeAttrs<T>>]?: Direction }[];


export type PopulateObj<T extends BaseType> = {
    [K in keyof PickOther<T["attributes"]>]?:
    { populate?: Populate<ExtractArr<Required<T["attributes"]>[K]["data"]>> }
}

export type Populate<T extends BaseType> =
    (keyof PickOther<T["attributes"]>)[] | PopulateObj<T> | "*" | "deep" | number | ["deep", number]

/**
 * query object followed by each strapi url
 */
export interface Query<T extends BaseType> {
    locale?: Locale
    filters?: Filters<T>
    publicationState?: "live" | "preview"
    pagination?: { start: number | string, limit: number | string, withCount: boolean } |
        { page: number | string, pageSize: number | string, withCount: boolean }
    sort?: Sort<T>
    fields?: (keyof T["attributes"])[]
    populate?: Populate<T>
}

export type PayloadMeta = {
    pagination?: ({ start: number, limit: number, } |
        { page: number, pageSize: number, pageCount: number }) &
        { total: number }
}

export interface UserInfo {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface User<T = UserInfo> {
    id: number;
    attributes: T
}

/**
 * type of data when post or put
 */
export type InputData<T extends BaseType> = MergeAttrs<T> & RelationData<T>

export type RelationData<T extends BaseType> = {
    [K in keyof PickOther<T["attributes"]>]?:
    MergeAttrs<ExtractArr<PickOther<T["attributes"]>[K]["data"]>>
}

export type Relation = number[] | { id: number }[]

export type RelationField = {
    connect?: Relation
    disconnect?: Relation
    set?: Relation
}

export type UserLogged<T = UserInfo> = {
    user: T & { id: number },
    jwt: string
}

export type Payload<T> = {
    data: T
    meta: PayloadMeta
}
