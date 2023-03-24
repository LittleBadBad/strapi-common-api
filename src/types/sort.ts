import {BaseType, MergeAttrs} from "./utils";

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
