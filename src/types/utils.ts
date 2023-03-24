export type OmitByType<T, Value> = {
    [P in keyof T as T[P] extends Value | undefined ? never : P]: T[P]
}
export type BaseType = { id: number, attributes: Record<string, any | { data: any }> }
export type PickOther<T extends Record<string, any | { data: any }>> = OmitByType<T, string | number | boolean>
export type ExtractArr<T> = T extends Array<any> ? T[number] : T
export type OmitOther<T extends Record<string, any | { data: any }>> = OmitByType<T, { data: any }>
export type MergeAttrs<T extends BaseType> = {
    [K in keyof OmitOther<T["attributes"]> | "id"]?:
    K extends "id" ? number : T["attributes"][K]
}