import {UserAttrs, UserLogged} from "../types";
import {strapiRequest} from "./request";

export const _me = (strapiRequest) => <T = UserAttrs>(): UserLogged<T>["user"] => {
    return strapiRequest.get("/users/me")
        .then(r => r.data)
}

export const user = {
    me: _me(strapiRequest)
}