import {authAPI, LoginParamsType} from "features/Login/auth-api";
import {createSlice} from "@reduxjs/toolkit";
import {appAction} from "app/appReducer";
import {todoListActions} from "features/todolists-List/todolists/todolists-reducer";
import {tasksActions} from "features/todolists-List/todolists/Todolist/Tasks/Task/tasks-reducer";
import {createAppAsyncThunk} from "common/utils";
import {ResulCode} from "common/enums/common.enums";

const userInfo: userInfoType = {
    id: null,
    login: null,
    email: null,
};

type userInfoType = {
    id: number | null;
    login: string | null;
    email: string | null;
};

export type AuthInitialStateType = {
    isLoggedIn: boolean
    user: userInfoType,
    captcha: null | string
}

const initialState:AuthInitialStateType = {
    isLoggedIn: false,
    user: userInfo,
    captcha: null
};



const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
    "auth/Login",
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        let data = await authAPI.getUserLoginForm({
            email: arg.email,
            rememberMe: arg.rememberMe,
            password: arg.password,
            captcha: arg.captcha,
        });
        if (data.data.resultCode === ResulCode.OK) {
            dispatch(authThunks.initializeApp());
            return {isLoggedIn: true};
        } else if(data.data.resultCode === 10){
            dispatch(getCaptchaUrl())
            return rejectWithValue({data: data.data, showGlobalError: false});
        }
        else {
            const isShowAppError = !data.data.fieldsErrors.length;
            return rejectWithValue({
                data: data.data,
                showGlobalError: isShowAppError,
            });
        }
    }
);

type LogOutReturnType = {
    isLoggedIn: boolean;
};

const logOut = createAppAsyncThunk<LogOutReturnType, void>(
    "auth/logOut",
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        const res = await authAPI.logOutUser();
        if (res.data.resultCode === ResulCode.OK) {
            dispatch(todoListActions.clearTodolists());
            dispatch(tasksActions.clearTasks());
            return {isLoggedIn: false};
        } else {
            return rejectWithValue({data: res.data, showGlobalError: true});
        }
    }
);

type initializeAppReturnType = {
    id: number;
    login: string;
    email: string;
    isLoggedIn: boolean;
};

const initializeApp = createAppAsyncThunk<initializeAppReturnType, void>(
    "auth/initializeApp",
    async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        try {
            const res = await authAPI.isAuthUser();
            if (res.data.resultCode === ResulCode.OK) {
                return {
                    id: res.data.data.id,
                    login: res.data.data.login,
                    email: res.data.data.email,
                    isLoggedIn: true,
                };
            } else {
                return rejectWithValue({data: res.data, showGlobalError: false});
            }
        } finally {
            dispatch(appAction.setInitialize({isInitialize: true}));
        }
    }
);


const getCaptchaUrl = createAppAsyncThunk<{ captcha: string }, void>(
    "auth/getCaptchaUrl",
    async (arg, thunkAPI) => {
        const res = await authAPI.getCaptcha();
        return {
            captcha: res.data.url
        };
    }
);

const slice = createSlice({
    name: "auth", //slice name
    initialState, //initial
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authThunks.login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
                state.captcha = null;
            })
            .addCase(authThunks.logOut.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
                state.user = {email: null, id: null, login: null};
            })
            .addCase(authThunks.initializeApp.fulfilled, (state, action) => {
                state.user = {
                    email: action.payload.email,
                    login: action.payload.login,
                    id: action.payload.id,
                };
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(authThunks.getCaptchaUrl.fulfilled, (state, action) => {
                state.captcha = action.payload.captcha
            })
    },
});

export const authReducer = slice.reducer;
export const authThunks = {login, logOut, initializeApp, getCaptchaUrl};
