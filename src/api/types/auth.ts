export type RegisterParamsType = {
    username: string,
    email: string,
    password_hash: string,
}

export type LoginParamsType = {
    email: string,
    password_hash: string,
    device_id: string | null,
}
export type LogOutParamsType = {
    device_id: string | null
}

export type LoginResponse = {
    access_token: string
    refresh_token: string
}

