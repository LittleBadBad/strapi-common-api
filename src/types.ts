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

export type WhereParams<T> = {
    [K in keyof T]?: T[K] | T[K][] | AttributeOperators<T, K>;
} & LogicalOperators<T>;

type LogicalOperators<T> = {
    $and?: WhereParams<T>[];
    $or?: WhereParams<T>[];
    $not?: WhereParams<T>;
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
    $not?: WhereParams<T> | AttributeOperators<T, K>;
};

export type BaseType = { id: number, attributes: Record<string, any | { data: any }> }

type PickByType<T, Value> = {
    [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P]
}

type OmitByType<T, Value> = {
    [P in keyof T as T[P] extends Value | undefined ? never : P]: T[P]
}

export type OmitOther<T extends Record<string, any | { data: any }>> = OmitByType<T, { data: any }>
export type PickOther<T extends Record<string, any | { data: any }>> = PickByType<T, { data: any }>

export type MergeAttrs<T extends BaseType> = {
    [K in keyof OmitOther<T["attributes"]> | "id"]?:
    K extends "id" ? number : T["attributes"][K]
}

export type RelationData<T extends BaseType> = {
    [K in keyof PickOther<T["attributes"]>]?:
    MergeAttrs<PickOther<T["attributes"]>[K]["data"]>
}

type RelationFilters<T extends BaseType> = {
    [K in keyof PickOther<T["attributes"]>]?:
    WhereParams<MergeAttrs<PickOther<T["attributes"]>[K]["data"]>>
}

export type Filters<T extends BaseType> =
    WhereParams<MergeAttrs<T> & RelationFilters<T>>

type Sortables<T> = {
    // check sortable
    [P in keyof T]: P;
}[keyof T];

type Direction = 'asc' | 'ASC' | 'DESC' | 'desc';

export type Sort<T> = Sortables<T>
    | Sortables<T>[]
    | { [K in Sortables<T>]?: Direction }
    | { [K in Sortables<T>]?: Direction }[];

/**
 * query object followed by each strapi url
 */
export interface Query<T extends BaseType> {
    locale?: Locale
    filters?: Filters<T>
    publicationState?: "live" | "preview"
    pagination?: { start: number, limit: number, withCount: boolean } |
        { page: number, pageSize: number, withCount: boolean }
    sort?: Sort<MergeAttrs<T>>
    fields?: (keyof T["attributes"])[]
    populate?: (keyof PickOther<T["attributes"]>)[]
}

export type ResponseMeta = {
    pagination: ({ start: number, limit: number, } |
        { page: number, pageSize: number, pageCount: number }) &
        { total: number }
}
