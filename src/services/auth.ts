import {UserAttrs, UserLogged} from "../types";
import {strapiRequest} from "./request";

export const _login = (strapiRequest) => <T = UserAttrs>({identifier, password}: {
    identifier: string,
    password: string,
}): Promise<UserLogged<T>> => {
    return strapiRequest.post("/auth/local",
        {identifier, password})
        .then(r => r.data)
}

export const _register = (strapiRequest) => <T = UserAttrs>({username, email, password}: {
    username: string
    email: string
    password: string
}): Promise<UserLogged<T>> => {
    return strapiRequest.post("/auth/local/register",
        {username, email, password})
        .then(r => r.data)
}

export const _forgotPassword = (strapiRequest) => ({email}: { email: string }) => {
    return strapiRequest.post("/auth/forgot-password",
        {email})
        .then(r => r.data)
}

export const _resetPassword = (strapiRequest) => ({code, password, passwordConfirmation}: {
    code: string
    password: string
    passwordConfirmation: string
}) => {
    return strapiRequest.post("/auth/reset-password",
        {code, password, passwordConfirmation})
        .then(r => r.data)
}

export const _changePassword = (strapiRequest) => ({currentPassword, password, passwordConfirmation}: {
    currentPassword: string
    password: string
    passwordConfirmation: string
}) => {
    return strapiRequest.post("/auth/change-password",
        {currentPassword, password, passwordConfirmation})
        .then(r => r.data)
}

export const _sendEmailConfirm = (strapiRequest) => ({email}: {
    email: string
}) => {
    return strapiRequest.post("/auth/send-email-confirmation",
        {email})
        .then(r => r.data)
}

export const _emailConfirm = (strapiRequest) => (token: string) => {
    return strapiRequest.get(`/auth/email-confirmation?confirmation=${token}`)
        .then(r => r.data)
}

export const auth = {
    login: _login(strapiRequest),
    register: _register(strapiRequest),
    forgotPassword: _forgotPassword(strapiRequest),
    resetPassword: _resetPassword(strapiRequest),
    changePassword: _changePassword(strapiRequest),
    sendEmailConfirm: _sendEmailConfirm(strapiRequest),
    emailConfirm: _emailConfirm(strapiRequest)
}
