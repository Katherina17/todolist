import {authAPI, LoginParamsType} from "features/login/auth-api";
import {createSlice} from "@reduxjs/toolkit";
import {appAction} from "app/appReducer";
import {todoListActions} from "features/todolists-List/todolists/todolists-reducer";
import {tasksActions} from "features/todolists-List/task/tasks-reducer";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError, thunkTryCatch} from "common/utils";
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
    return thunkTryCatch(thunkAPI, async () => {
        let data = await authAPI.getUserLoginForm({email: arg.email, rememberMe: arg.rememberMe, password: arg.password, captcha: arg.captcha})
        if(data.data.resultCode === ResulCode.OK){
            dispatch(authThunks.initializeApp())
            return {isLoggedIn: true}
        } else {
            const isShowAppError = !data.data.fieldsErrors.length
            handleServerAppError(data.data, dispatch, isShowAppError)
            return rejectWithValue(data.data)
        }
    })
})

type LogOutReturnType = {
    isLoggedIn: boolean,
}

const logOut = createAppAsyncThunk<LogOutReturnType, void>('auth/logOut', async (arg, thunkAPI) => {
    const{dispatch, rejectWithValue} = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.logOutUser()
        if (res.data.resultCode === ResulCode.OK) {
            dispatch(todoListActions.clearTodolists())
            dispatch(tasksActions.clearTasks())
            return {isLoggedIn: false}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    })
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
export const authThunks = {login, logOut, initializeApp}
