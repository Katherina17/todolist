import {commonTasksActionsType, tasksReducer} from '../features/TodoListsList/tasks-reducer'
import {commonTodoListsActionsType, TodoListReducer} from '../features/TodoListsList/todolists-reducer'
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionsType, appReducer} from "./appReducer";
import {useDispatch} from "react-redux";
import {authReducer, commonAuthActionsType} from "../features/Login/auth-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: TodoListReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk)) //createSore -> old
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppStateType = ReturnType<typeof store.getState>
type commonAppActionType = commonTodoListsActionsType | commonTasksActionsType | AppActionsType | commonAuthActionsType;
export type AppThunkDispatch = ThunkDispatch<AppStateType, unknown, commonAppActionType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,AppStateType, unknown, commonAppActionType>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
