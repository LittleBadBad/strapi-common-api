import axios, {AxiosInstance, CreateAxiosDefaults} from "axios";
import * as auth from "./auth";
import * as collection from "./collection";
import * as single from "./single";

export const strapiRequest: AxiosInstance = axios.create({
    baseURL: "http://localhost:1337/api",
    timeout: 10000
});

export function createStrapiClient(baseURL, config: CreateAxiosDefaults<any> = {}) {
    const strapiClient = axios.create({
        baseURL: baseURL || config.baseURL || "http://localhost:1337/api",
        ...config
    });
    return {
        strapiClient,
        auth: {
            login: auth._login(strapiClient),
            register: auth._register(strapiClient),
            forgotPassword: auth._forgotPassword(strapiClient),
            resetPassword: auth._resetPassword(strapiClient),
            changePassword: auth._changePassword(strapiClient),
            sendEmailConfirm: auth._sendEmailConfirm(strapiClient),
            emailConfirm: auth._emailConfirm(strapiClient)
        },
        collection: {
            getOne: collection._getOne(strapiClient),
            getMany: collection._getMany(strapiClient),
            post: collection._post(strapiClient),
            put: collection._put(strapiClient),
            remove: collection._remove(strapiClient)
        },
        single: {
            get: single._get(strapiClient),
            put: single._put(strapiClient),
            remove: single._remove(strapiClient)
        }
    }
}