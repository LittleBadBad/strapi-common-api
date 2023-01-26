import {BaseType, InputData, Query, Response} from "../types";
import {strapiRequest} from "./request";
import qs from "qs";

function get<T extends BaseType = BaseType>(type: string, query: Query<T>): Promise<Response<T>> {
    return strapiRequest.get(`/${type}?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}

function put<T extends BaseType = BaseType>(type: string, data: InputData<T>, query: Query<T>): Promise<Response<T>> {
    return strapiRequest.put(`/${type}?${qs.stringify(query, {encodeValuesOnly: true})}`,
        {data}).then(r => r.data)
}

function remove<T extends BaseType = BaseType>(type: string, query: Query<T>): Promise<Response<T>> {
    return strapiRequest.delete(`/${type}?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}

export const single = {
    get, put, remove
}
