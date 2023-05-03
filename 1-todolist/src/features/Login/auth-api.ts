import {ResponseType} from "common/types/common.types";
import {instance} from "common/api/common.api";


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    getUserLoginForm(params: LoginParamsType){
        return instance.post<ResponseType<{userId: number}>>('auth/login', params)
    },
    isAuthUser(){
        return instance.get<ResponseType<{id: number, email: string, login: string}>>('auth/me')
    },
    logOutUser(){
        return instance.delete<ResponseType>('auth/login')
    },
    getCaptcha(){
        return instance.get<{url: string}>('security/get-captcha-url')
    }
}
