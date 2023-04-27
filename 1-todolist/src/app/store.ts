import {tasksReducer} from 'features/todolists-List/task/tasks-reducer'
import { TodoListReducer} from 'features/todolists-List/todolists/todolists-reducer'
import {AnyAction,  combineReducers} from "redux";
import  {
    ThunkAction,
    ThunkDispatch
} from "redux-thunk";
import {appReducer} from "./appReducer";
import {authReducer} from "features/login/auth-reducer";
import {configureStore, createAction} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: TodoListReducer,
    app: appReducer,
    auth: authReducer
})


export const store = configureStore({
    reducer: rootReducer
}) //we don't need to write applyMiddleware, done under the hood
//if we need more than one middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
export const clearAction = createAction('clear');

// непосредственно создаём store
//export const _store = legacy_createStore(rootReducer, applyMiddleware(thunk)) //createSore -> old create store in REDUX
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppStateType = ReturnType<typeof store.getState>
//export type commonAppActionType = commonTasksActionsType;
export type AppThunkDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,AppStateType, unknown, AnyAction>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
