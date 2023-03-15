import { tasksReducer } from '../features/TodoListsList/tasks-reducer'
import {TodoListReducer} from '../features/TodoListsList/todolists-reducer'
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk from "redux-thunk";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: TodoListReducer,
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk)) //createSore -> old
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
