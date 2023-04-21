import {authAPI, LoginParamsType} from "features/Login/auth-api";
import {createSlice} from "@reduxjs/toolkit";
import {appAction} from "app/appReducer";
import {todoListActions} from "features/TodoListsList/todolists-reducer";
import {tasksActions} from "features/TodoListsList/tasks-reducer";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "common/utils";
import {ResulCode} from "common/enums/common.enums";


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

const login = createAppAsyncThunk<{isLoggedIn: boolean}, LoginParamsType>('auth/login', async (arg, thunkAPI) => {
    const{dispatch, rejectWithValue} = thunkAPI;
    dispatch(appAction.setStatus({status: 'loading'}))
    try{
        let data = await authAPI.getUserLoginForm({email: arg.email, rememberMe: arg.rememberMe, password: arg.password, captcha: arg.captcha})
        if(data.data.resultCode === ResulCode.OK){
            dispatch(authThunks.initializeApp())
            return {isLoggedIn: true}
        } else {
            const isShowAppError = !data.data.fieldsErrors.length
            handleServerAppError(data.data, dispatch, isShowAppError)
            return rejectWithValue(data.data)
        }
    }
    catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
    finally {
        dispatch(appAction.setStatus({status: 'idle'}))
    }
})

type LogOutReturnType = {
    isLoggedIn: boolean,
}

const logOut = createAppAsyncThunk<LogOutReturnType, void>('auth/logOut', async (arg, thunkAPI) => {
    const{dispatch, rejectWithValue} = thunkAPI;
    dispatch(appAction.setStatus({status: 'loading'}))
    try{
       const res = await authAPI.logOutUser()
            if (res.data.resultCode === ResulCode.OK) {
                dispatch(todoListActions.clearTodolists())
                dispatch(tasksActions.clearTasks())
                return {isLoggedIn: false}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
    }
    catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
    finally {
        dispatch(appAction.setStatus({status: 'idle'}))
    }
})

type initializeAppReturnType = {
    id: number,
    login: string,
    email: string
    isLoggedIn: boolean
}

const initializeApp = createAppAsyncThunk<initializeAppReturnType, void>('auth/initializeApp', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        const res = await authAPI.isAuthUser()
        if (res.data.resultCode === ResulCode.OK) {
            return {id: res.data.data.id, login: res.data.data.login, email: res.data.data.email, isLoggedIn: true}
        } else {
            return rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(appAction.setInitialize({isInitialize: true}))
    }
})



const slice = createSlice({
    name: 'auth', //slice name
    initialState, //initial
    reducers: {
      /*  setIsLoggedIn: (state, action: PayloadAction<{isLoggedIn: boolean}>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }*/
        /*setUserInfo: (state, action:PayloadAction<{id: number | null, login: string | null, email: string | null}>) => {
            state.user = action.payload
        }*/
    },
    extraReducers: builder => {
        builder
            .addCase(authThunks.login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(authThunks.logOut.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
                state.user = {email: null, id: null, login: null}
            })
            .addCase(authThunks.initializeApp.fulfilled, (state, action) => {
                state.user = {email: action.payload.email, login: action.payload.login, id: action.payload.id}
                state.isLoggedIn = action.payload.isLoggedIn
            })
    }

})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {login, logOut, initializeApp}


type InitialStateType = typeof initialState



// thunks


/*
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
*/



/*export const logOutTC = (): AppThunk => (dispatch) => {
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
}*/
