import {AppRootStateType} from "app/store";
import {RequestStatusType} from "app/appReducer";



export const status = (state: AppRootStateType): RequestStatusType => state.app.status;
export const userLogin = (state: AppRootStateType): string | null => state.auth.user.login;
export const isInitialized = (state: AppRootStateType): boolean => state.app.isInitialized;
