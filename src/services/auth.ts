import {UserInfo, UserLogged} from "../types";
import {strapiRequest} from "./request";

function login<T = UserInfo>({identifier, password}: {
    identifier: string,
    password: string,
}): Promise<UserLogged<T>> {
    return strapiRequest.post("/auth/local",
        {identifier, password})
        .then(r => r.data)
}

function register<T = UserInfo>({username, email, password}: {
    username: string
    email: string
    password: string
}): Promise<UserLogged<T>> {
    return strapiRequest.post("/auth/local/register",
        {username, email, password})
        .then(r => r.data)
}

function forgotPassword({email}: { email: string }) {
    return strapiRequest.post("/auth/forgot-password",
        {email})
        .then(r => r.data)
}

function resetPassword({code, password, passwordConfirmation}: {
    code: string
    password: string
    passwordConfirmation: string
}) {
    return strapiRequest.post("/auth/reset-password",
        {code, password, passwordConfirmation})
        .then(r => r.data)
}

function changePassword({currentPassword, password, passwordConfirmation}: {
    currentPassword: string
    password: string
    passwordConfirmation: string
}) {
    return strapiRequest.post("/auth/change-password",
        {currentPassword, password, passwordConfirmation})
        .then(r => r.data)
}

function sendEmailConfirm({email}: {
    email: string
}) {
    return strapiRequest.post("/auth/send-email-confirmation",
        {email})
        .then(r => r.data)
}

function emailConfirm(token: string) {
    return strapiRequest.get(`/auth/email-confirmation?confirmation=${token}`)
        .then(r => r.data)
}

export const auth = {
    login,
    register,
    forgotPassword,
    resetPassword,
    changePassword,
    sendEmailConfirm,
    emailConfirm
}
