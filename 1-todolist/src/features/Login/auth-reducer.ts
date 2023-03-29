import { Dispatch } from 'redux'
import {AppActionsType, setErrorAC, setInitializeAC, setStatusAC} from "../../app/appReducer";
import {AppThunk} from "../../app/store";
import {authAPI, LoginParamsType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const userInfo:userInfoType = {
    id: null,
    login: null,
    email: null
}

const initialState = {
    isLoggedIn: false,
    user: userInfo
}

type userInfoType = {
    id: number | null
    login: string | null
    email: string | null
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: commonAuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':{
            return {...state, isLoggedIn: action.value}
        }
        case "login/SET-USER-INFO": {
            return{...state, user: {...action.payload}}
        }
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

const setUserInfo = (id: number | null, login: string | null, email: string | null) => {
    return {
        type: 'login/SET-USER-INFO',
        payload: {id, login, email}
    } as const
}

// thunks
export const loginTC = (formikLoginParams: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    authAPI.getUserLoginForm(formikLoginParams).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
           /* dispatch(initializeAppTC())*/
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch(error => handleServerNetworkError(error.message, dispatch))
        .finally(() => dispatch(setStatusAC('idle')))
}


export const initializeAppTC = (): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    authAPI.isAuthUser().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserInfo(res.data.data.id, res.data.data.login, res.data.data.email))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch(error => handleServerNetworkError(error.message, dispatch))
        .finally(() => {
            dispatch(setStatusAC('idle'))
            dispatch(setInitializeAC(true))
        })
}



export const logOutTC = (): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    authAPI.logOutUser().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setUserInfo(null, null, null))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch(error => handleServerNetworkError(error.message, dispatch))
        .finally(() => dispatch(setStatusAC('idle')))
}

// types
export type commonAuthActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setUserInfo>
