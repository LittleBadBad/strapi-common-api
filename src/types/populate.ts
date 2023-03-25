import {BaseType, ExtractArr, LengthOfString, RelationKeys, RelationObj} from "./utils";
import {Sort} from "./sort";
import {Filters} from "./filters";

type GenNode<K extends string | number, IsRoot extends boolean> =
    IsRoot extends true ? `${K}` : `.${K}`

export type DeepPopulateArr<
    T extends BaseType,
    ML extends number = 3,
    IsRoot extends boolean = true,
    L extends string = "",
    K extends RelationKeys<T> = RelationKeys<T>
> =
    K extends string | number ?
        GenNode<K, IsRoot> |
        (LengthOfString<L> extends ML ? never :
            `${GenNode<K, IsRoot>}${DeepPopulateArr<ExtractArr<RelationObj<T, K>>, ML, false, `${L}1`>}`)
        : never;

export type PopulateObj<T extends BaseType> = {
    [K in RelationKeys<T>]?:
    (RelationObj<T, K> extends Array<any> ?
        {
            sort?: Sort<T>
            populate?: Populate<ExtractArr<RelationObj<T, K>>>
            filters?: Filters<T>
        } : { populate?: Populate<ExtractArr<RelationObj<T, K>>> })| "*"
}
export type Populate<T extends BaseType> =
    (DeepPopulateArr<T>)[] | PopulateObj<T> | "*" | "deep" | number | ["deep", number]
