import {FilterValuesType, ValidTodoListType} from "../../trash/App";
import {todolistAPI, TodoListType} from "../../api/todolist-api";
import {Dispatch} from "redux";

const initialState: ValidTodoListType[] = [];

export const TodoListReducer = (state: ValidTodoListType[] = initialState, action: commonActionsType):ValidTodoListType[] => {
   switch (action.type){
       case "REMOVE-TODOLIST": {
           return state.filter(tl => tl.id != action.payload.id)
       }
       case "ADD-TODOLIST": {
           return [{...action.payload.todoList, filter: 'all'}, ...state]
       }
       case "CHANGE_TODOLIST_TITLE": {
           return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el);
       }
       case "CHANGE_FILTER": {
           return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.value} : el)
       }
       case "SET_TODOLISTS":{
           return action.payload.todoLists.map(td => ({...td, filter: 'all'}))
       }
       default: return state

   }
}

export const removeTodoListAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const 
}

export const addTodoListAC = (todoList: TodoListType, newTodolistId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {todoList, newTodolistId}
    } as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {id, title}
    } as const
}

export const changeFilterAC = (value: FilterValuesType, id: string) => {
    return {
        type: 'CHANGE_FILTER',
        payload: {value, id}
    } as const
}

export const setTodoListsAC = (todoLists: TodoListType[]) => {
    return {
        type: 'SET_TODOLISTS',
        payload: {todoLists}
    } as const
}


export const getTodoListsTC = () => (dispatch: Dispatch<commonActionsType>) => {
        todolistAPI.getTodoList().then((res) => {
            dispatch(setTodoListsAC(res.data))
        })
    }


export const deleteTodoListsTC = (id: string) => (dispatch: Dispatch<commonActionsType>) => {
    todolistAPI.deleteTodolist(id).then((res) => {
        if(res.data.resultCode === 0){
            dispatch(removeTodoListAC(id))
        }
    })
}


export const addTodoListsTC = (title: string) => (dispatch: Dispatch<commonActionsType>) => {
    todolistAPI.createTodoList(title).then((res) => {
        dispatch(addTodoListAC(res.data.data.item, res.data.data.item.id))
    })
}

export const updateTodoListTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<commonActionsType>) => {
        todolistAPI.updateTodolistTitle(id, title).then(res => {
            dispatch(changeTodolistTitleAC(id, title))
        })
    }
}

type commonActionsType = removeTodoListAC
    | addTodoListAC
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | setTodoListsAC ;

export type removeTodoListAC = ReturnType<typeof removeTodoListAC>
export type addTodoListAC = ReturnType<typeof addTodoListAC>
export type setTodoListsAC = ReturnType<typeof setTodoListsAC>

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
