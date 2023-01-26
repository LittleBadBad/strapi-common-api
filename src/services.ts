import axios from "axios";
import qs from "qs";
import {BaseType, MergeAttrs, Query, RelationData, ResponseMeta} from "./types";

type Return<T> = {
    data: T
    meta: ResponseMeta
}
export type InputData<T extends BaseType> = MergeAttrs<T> & RelationData<T>

export const strapiRequest = axios.create({
    baseURL: process.env.REACT_APP_STRAPI_API || "http://localhost:1337/api",
    timeout: 10000
});

/**
 * get many resources
 * @param type strapi content-type name
 * @param query strapi query object
 */
export function getMany<T extends BaseType>(type: string, query?: Query<T>): Promise<Return<T[]>> {
    return strapiRequest.get(`/${type}?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}

/**
 * get one resource
 * @param type strapi content-type name
 * @param id resources id
 * @param query strapi query object
 */
export function getOne<T extends BaseType>(type: string, id: number, query?: Query<T>): Promise<Return<T>> {
    return strapiRequest.get(`/${type}/${id}?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}

/**
 * add one resource
 * @param type strapi content-type name
 * @param data post data
 * @param query strapi query object
 */
export function post<T extends BaseType>(type: string, data: InputData<T>, query?: Query<T>): Promise<Return<T>> {
    return strapiRequest.post(`/${type}?${qs.stringify(query, {encodeValuesOnly: true})}`,
        {data}).then(r => r.data)
}

/**
 * put one resource
 * @param type strapi content-type name
 * @param id resource id
 * @param data post data
 * @param query strapi query object
 */
export function put<T extends BaseType>(type: string, id: number, data: InputData<T>, query?: Query<T>): Promise<Return<T>> {
    return strapiRequest.put(`/${type}/${id}?${qs.stringify(query, {encodeValuesOnly: true})}`,
        {data}).then(r => r.data)
}

/**
 * remove one resource
 * @param type strapi content-type name
 * @param id resource id
 * @param query strapi query object
 */
export function remove<T extends BaseType>(type: string, id: number, query?: Query<T>): Promise<Return<T>> {
    return strapiRequest.delete(`/${type}/${id}?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}
