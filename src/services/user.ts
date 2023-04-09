import {Query, User, UserAttrs, UserLogged} from "../types";
import {strapiRequest} from "./request";
import qs from "qs";

export const _me = (strapiRequest) => <T = UserAttrs>(query?: Query<User<T>>): UserLogged<T>["user"] => {
    return strapiRequest.get(`/users/me?${qs.stringify(query, {encodeValuesOnly: true})}`)
        .then(r => r.data)
}

export const user = {
    me: _me(strapiRequest)
}