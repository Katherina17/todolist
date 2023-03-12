import {FilterValuesType, ValidTodoListType} from "../App";
import {v1} from "uuid";
import {todolistAPI, TodoListType} from "../api/todolist-api";
import {AnyAction, Dispatch} from "redux";
import {AppDispatch} from "./store";

const initialState: ValidTodoListType[] = [];

export const TodoListReducer = (state: ValidTodoListType[] = initialState, action: commonActionsType):ValidTodoListType[] => {
   switch (action.type){
       case "REMOVE-TODOLIST": {
           return state.filter(tl => tl.id != action.payload.id)
       }
       case "ADD-TODOLIST": {
           let newTodolist: ValidTodoListType =  {addedDate: '', id: action.payload.newTodolistId, order: 0, title: action.payload.title, filter: "all"}
           return [...state, newTodolist]
       }
       case "CHANGE_TODOLIST_TITLE": {
           return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el);
       }
       case "CHANGE_FILTER": {
           return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.value} : el)
       }
       case "SET_TODOLISTS":{
           return action.payload.todoLists.map(td => ({...td, filter: 'all'}))
       }
       default: return state

   }
}

type commonActionsType = removeTodoListAC | addTodoListAC | changeTodolistTitleAC | changeFilterAC | setTodoListsAC ;

export type removeTodoListAC = ReturnType<typeof removeTodoListAC>
export type addTodoListAC = ReturnType<typeof addTodoListAC>
type changeTodolistTitleAC = ReturnType<typeof changeTodolistTitleAC>
type changeFilterAC = ReturnType<typeof changeFilterAC>
export type setTodoListsAC = ReturnType<typeof setTodoListsAC>

export const removeTodoListAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const 
}

export const addTodoListAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title, newTodolistId: v1()}
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {id, title}
    } as const
}

export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE_FILTER',
        payload: {value, todolistId}
    } as const
}

export const setTodoListsAC = (todoLists: TodoListType[]) => {
    return {
        type: 'SET_TODOLISTS',
        payload: {todoLists}
    } as const
}


export const getTodoListsTC = () => (dispatch: Dispatch) => {
        todolistAPI.getTodoList().then((res) => {
            dispatch(setTodoListsAC(res.data))
        })
    }
