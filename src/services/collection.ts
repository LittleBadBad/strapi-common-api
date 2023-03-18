import {BaseType, InputData, Query, RelationField, Payload} from "../types";
import {strapiRequest} from "./request";
import qs from "qs";


/**
 * get many resources
 * @param strapiRequest
 */
export const _getMany = (strapiRequest) => <T extends BaseType = BaseType>(type: string, query?: Query<T>): Promise<Payload<T[]>> => {
    return strapiRequest.get(`/${type}?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}

/**
 * get one resource
 * @param strapiRequest
 */
export const _getOne = (strapiRequest) => <T extends BaseType = BaseType>(type: string, id: number | string, query?: Query<T>): Promise<Payload<T>> => {
    return strapiRequest.get(`/${type}/${id}?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}

/**
 * add one resource
 * @param strapiRequest
 */
export const _post = (strapiRequest) => <T extends BaseType = BaseType>(type: string, data: InputData<T>, query?: Query<T>): Promise<Payload<T>> => {
    return strapiRequest.post(`/${type}?${qs.stringify(query, {encodeValuesOnly: true})}`,
        {data}).then(r => r.data)
}

/**
 * put one resource
 * @param strapiRequest
 */
export const _put = (strapiRequest) => <T extends BaseType = BaseType>(type: string, id: number, data: InputData<T> & RelationField, query?: Query<T>): Promise<Payload<T>> => {
    return strapiRequest.put(`/${type}/${id}?${qs.stringify(query, {encodeValuesOnly: true})}`,
        {data}).then(r => r.data)
}

/**
 * remove one resource
 * @param strapiRequest
 */
export const _remove = (strapiRequest) => <T extends BaseType = BaseType>(type: string, id: number, query?: Query<T>): Promise<Payload<T>> => {
    return strapiRequest.delete(`/${type}/${id}?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}

export const collection = {
    getOne:_getOne(strapiRequest),
    getMany:_getMany(strapiRequest),
    post:_post(strapiRequest),
    put:_put(strapiRequest),
    remove:_remove(strapiRequest)
}
