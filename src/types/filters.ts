import {BaseType, ExtractArr, MergeAttrs, OmitByType, OmitRelations, PickRelations, RelationKeys} from "./utils";

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

export type WhereParams<T> = {
    [K in keyof T]?: T[K] | T[K][] | AttributeOperators<T, K>;
}

export type CommonFilters<T extends BaseType> =
    WhereParams<OmitByType<MergeAttrs<T>, { data: any }>>


export type RelationFilters<T extends BaseType> = {
    [K in RelationKeys<T>]?:
    Filters<ExtractArr<PickRelations<T>[K]["data"]>>
}

export type FiltersWithoutLogical<T extends BaseType> =
    CommonFilters<T> & RelationFilters<T>


type LogicalOperators<T extends BaseType> = {
    $and?: Filters<T>[];
    $or?: Filters<T>[];
    $not?: Filters<T>;
};

export type Filters<T extends BaseType> =
    FiltersWithoutLogical<T> & LogicalOperators<T>
