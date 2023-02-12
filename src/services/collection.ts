import {BaseType, InputData, Query, Response} from "../types";
import {strapiRequest} from "./request";
import qs from "qs";


/**
 * get many resources
 * @param type strapi content-type name
 * @param query strapi query object
 */
function getMany<T extends BaseType = BaseType>(type: string, query?: Query<T>): Promise<Response<T[]>> {
    return strapiRequest.get(`/${type}?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}

/**
 * get one resource
 * @param type strapi content-type name
 * @param id resources id
 * @param query strapi query object
 */
function getOne<T extends BaseType = BaseType>(type: string, id: number | string, query?: Query<T>): Promise<Response<T>> {
    return strapiRequest.get(`/${type}/${id}?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}

/**
 * add one resource
 * @param type strapi content-type name
 * @param data post data
 * @param query strapi query object
 */
function post<T extends BaseType = BaseType>(type: string, data: InputData<T>, query?: Query<T>): Promise<Response<T>> {
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
function put<T extends BaseType = BaseType>(type: string, id: number, data: InputData<T>, query?: Query<T>): Promise<Response<T>> {
    return strapiRequest.put(`/${type}/${id}?${qs.stringify(query, {encodeValuesOnly: true})}`,
        {data}).then(r => r.data)
}

/**
 * remove one resource
 * @param type strapi content-type name
 * @param id resource id
 * @param query strapi query object
 */
function remove<T extends BaseType = BaseType>(type: string, id: number, query?: Query<T>): Promise<Response<T>> {
    return strapiRequest.delete(`/${type}/${id}?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}

export const collection = {
    getOne,
    getMany,
    post,
    put,
    remove
}
