import {instance} from "./task-api";
import {ResponseType} from "./todolist-api";


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
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
    }
}
