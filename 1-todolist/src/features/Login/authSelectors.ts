import {AppRootStateType} from "app/store";

export const isLoggedIn = (state: AppRootStateType): boolean => state.auth.isLoggedIn