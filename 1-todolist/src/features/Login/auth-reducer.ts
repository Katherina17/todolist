import {AppThunk} from "app/store";
import {authAPI, LoginParamsType} from "api/auth-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {appAction} from "app/appReducer";
import {todoListActions} from "features/TodoListsList/todolists-reducer";
import {tasksActions} from "features/TodoListsList/tasks-reducer";
import {handleServerNetworkError} from "utils/handle-server-network-error";
import {handleServerAppError} from "utils/handle-server-app-error";

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
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setUserInfo: (state, action:PayloadAction<{id: number | null, login: string | null, email: string | null}>) => {
            state.user = action.payload
        }
    },

})

export const authReducer = slice.reducer
export const authActions = slice.actions


type InitialStateType = typeof initialState



// thunks
export const loginTC = (formikLoginParams: LoginParamsType): AppThunk => async (dispatch) => {
    dispatch(appAction.setStatus({status: 'loading'}))
    try {
        const data = await authAPI.getUserLoginForm(formikLoginParams)
        if(data.data.resultCode === 0){
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            dispatch(initializeAppTC())
        } else {
            handleServerAppError(data.data, dispatch)
        }
    }
    catch (e: any){
       handleServerNetworkError(e.message, dispatch)
    }
    finally {
        dispatch(appAction.setStatus({status: 'idle'}))
    }
}


export const initializeAppTC = (): AppThunk => (dispatch) => {
    dispatch(appAction.setStatus({status: 'loading'}))
    authAPI.isAuthUser().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(authActions.setUserInfo({id: res.data.data.id, login: res.data.data.login, email: res.data.data.email}))
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
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
            dispatch(todoListActions.clearTodolists())
            dispatch(tasksActions.clearTasks())
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch(error => handleServerNetworkError(error.message, dispatch))
        .finally(() => dispatch(appAction.setStatus({status: 'idle'})))
}
