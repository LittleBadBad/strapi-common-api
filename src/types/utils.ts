export type OmitByType<T, Value> = {
    [P in keyof T as T[P] extends Value | undefined ? never : P]: T[P]
}

export type BaseType = { id: number, attributes: Record<string, any | { data: any }> }
export type ExtractArr<T> = T extends Array<any> ? T[number] : T

/**
 * convert {id:number,data:{a:any,b:any,c:{data:{id:number,attributes:{}}}...}}
 * to {c:{data:{id:number,attributes:{}}}}
 * pick only relation attrs
 */
export type PickRelations<T extends BaseType> = OmitByType<T["attributes"], string | number | boolean>

export type OmitRelations<T extends BaseType> = OmitByType<T["attributes"], { data: any }>


/**
 * get all relation attrs keys
 */
export type RelationKeys<T extends BaseType> = keyof PickRelations<T>

/**
 * convert {id:number,data:{a:any,b:any,c:{data:{id:number,attributes:{}}},d:any...}}
 * to {id:number,a:any,d:any...}
 * exclude relation attrs
 */
export type MergeAttrs<T extends BaseType> = {
    [K in (keyof OmitRelations<T>) | "id"]?:
    K extends "id" ? number : T["attributes"][K]
}

export type RelationObj<T extends BaseType, K extends RelationKeys<T>> =
    Required<T["attributes"]>[K]["data"]

export type Concat<T extends any[], U extends any[]> = [...T, ...U];

type UnionToIntersection<U> =
    (U extends U ? (arg: U) => any : never) extends (arg: infer P) => any ? P : never

export type UnionToTuple<T> =
    UnionToIntersection<
        T extends any ? () => T : never
    > extends () => infer ReturnType
        ? [...UnionToTuple<Exclude<T, ReturnType>>, ReturnType]
        : [];

export type IsAny<T> = (any extends T & 0 ? 1 : 2) extends 1 ? true : false

export type Join<T extends (string | number | symbol)[], U extends string | number> =
    T extends [
        infer Head extends string,
        ...infer Tail extends string[]
    ] ? `${Head}${Tail['length'] extends 0 ? '' : U}${Join<Tail, U>}` : ''

export type LengthOfString<S extends string, L extends unknown[] = []> = S extends `${infer F}${infer R}` ? LengthOfString<R, [F, ...L]> : L['length']
