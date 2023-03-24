import {BaseType, ExtractArr, PickOther} from "./utils";


export type PopulateObj<T extends BaseType> = {
    [K in keyof PickOther<T["attributes"]>]?:
    { populate?: Populate<ExtractArr<Required<T["attributes"]>[K]["data"]>> } | "*"
}
export type Populate<T extends BaseType> =
    (keyof PickOther<T["attributes"]>)[] | PopulateObj<T> | "*" | "deep" | number | ["deep", number]
