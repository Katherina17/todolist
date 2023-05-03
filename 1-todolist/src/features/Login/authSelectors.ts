import {AppRootStateType} from "app/store";

export const isLoggedIn = (state: AppRootStateType): boolean => state.auth.isLoggedIn


export const captcha = (state: AppRootStateType): string | null => state.auth.captcha