import {BaseType, InputData, Query, Payload} from "../types";
import {strapiRequest} from "./request";
import qs from "qs";

export const _get = (strapiRequest) => <T extends BaseType = BaseType>(type: string, query?: Query<T>): Promise<Payload<T>> => {
    return strapiRequest.get(`/${type}?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}

export const _put = (strapiRequest) => <T extends BaseType = BaseType>(type: string, data: InputData<T>, query?: Query<T>): Promise<Payload<T>> => {
    return strapiRequest.put(`/${type}?${qs.stringify(query, {encodeValuesOnly: true})}`,
        {data}).then(r => r.data)
}

export const _remove = (strapiRequest) => <T extends BaseType = BaseType>(type: string, query?: Query<T>): Promise<Payload<T>> => {
    return strapiRequest.delete(`/${type}?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}

export const single = {
    get: _get(strapiRequest), put: _put(strapiRequest), remove: _remove(strapiRequest)
}
