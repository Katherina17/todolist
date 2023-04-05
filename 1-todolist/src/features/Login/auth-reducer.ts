import {AppThunk} from "app/store";
import {authAPI, LoginParamsType} from "api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appAction} from "app/appReducer";

const userInfo:userInfoType = {
    id: null,
    login: null,
    email: null
}

type userInfoType = {
    id: number | null
    login: string | null
    email: string | null
}
const initialState = {
    isLoggedIn: false,
    user: userInfo
}


const slice = createSlice({
    name: 'auth', //slice name
    initialState, //initial
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
            /*return {...state, isLoggedIn: action.value}*/
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setUserInfo: (state, action:PayloadAction<{id: number | null, login: string | null, email: string | null}>) => {
            state.user = action.payload
        }
    }


})

export const authReducer = slice.reducer
export const authActions = slice.actions


type InitialStateType = typeof initialState



// thunks
export const loginTC = (formikLoginParams: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(appAction.setStatus({status: 'loading'}))
    authAPI.getUserLoginForm(formikLoginParams).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
           /* dispatch(initializeAppTC())*/
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch(error => handleServerNetworkError(error.message, dispatch))
        .finally(() => dispatch(appAction.setStatus({status: 'idle'})))
}


export const initializeAppTC = (): AppThunk => (dispatch) => {
    dispatch(appAction.setStatus({status: 'loading'}))
    authAPI.isAuthUser().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            dispatch(authActions.setUserInfo({id: res.data.data.id, login: res.data.data.login, email: res.data.data.email}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch(error => handleServerNetworkError(error.message, dispatch))
        .finally(() => {
            dispatch(appAction.setStatus({status: 'idle'}))
            dispatch(appAction.setInitialize({isInitialize: true}))
        })
}



export const logOutTC = (): AppThunk => (dispatch) => {
    dispatch(appAction.setStatus({status: 'loading'}))
    authAPI.logOutUser().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
            dispatch(authActions.setUserInfo({id: null, login: null, email: null}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch(error => handleServerNetworkError(error.message, dispatch))
        .finally(() => dispatch(appAction.setStatus({status: 'idle'})))
}

// types
/*export type commonAuthActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setUserInfo>*/

/* const authReducer = (state: InitialStateType = initialState, action: commonAuthActionsType): InitialStateType => {
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
}*/
/*// actions
 const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

const setUserInfo = (id: number | null, login: string | null, email: string | null) => {
    return {
        type: 'login/SET-USER-INFO',
        payload: {id, login, email}
    } as const
}*/
