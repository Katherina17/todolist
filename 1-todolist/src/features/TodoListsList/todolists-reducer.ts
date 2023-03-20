import {FilterValuesType, ValidTodoListType} from "../../trash/App";
import {todolistAPI, TodoListType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusAC} from "../../app/appReducer";
import { AppThunk} from "../../app/store";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: ValidTodoListType[] = [];

export const TodoListReducer = (state: ValidTodoListType[] = initialState, action: commonTodoListsActionsType):ValidTodoListType[] => {
   switch (action.type){
       case "REMOVE-TODOLIST": {
           return state.filter(tl => tl.id != action.payload.id)
       }
       case "ADD-TODOLIST": {
           return [{...action.payload.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
       }
       case "CHANGE_TODOLIST_TITLE": {
           return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el);
       }
       case "CHANGE_FILTER": {
           return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.value} : el)
       }
       case "SET_TODOLISTS":{
           return action.payload.todoLists.map(td => ({...td, filter: 'all', entityStatus: 'idle'}))
       }
       case "CHANGE_ENTITY_STATUS": {
           return state.map(el => el.id === action.payload.id ? {...el, entityStatus: action.payload.entityStatus} : el)
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

export const changeEntityStatusAC = (entityStatus: RequestStatusType, id: string) => {
    return {
        type: 'CHANGE_ENTITY_STATUS',
        payload: {entityStatus, id}
    } as const
}

export const setTodoListsAC = (todoLists: TodoListType[]) => {
    return {
        type: 'SET_TODOLISTS',
        payload: {todoLists}
    } as const
}


export const getTodoListsTC = (): AppThunk => (dispatch: Dispatch<commonTodoListsActionsType | setStatusAC>) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.getTodoList().then((res) => {
        if(res.data){
            dispatch(setTodoListsAC(res.data))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export enum ResulCode {
    OK = 0,
    Error = 1,
    Captcha = 10
} // для читаемости, также называются magicNumber


const top10 = 'top10'
enum ButtonName{
    top10 = 'Топ-10',
    top20= 'Топ-20',
    img = 'Изображение'
} // для чего нужны enum


export const deleteTodoListsTC = (id: string): AppThunk => (dispatch) => {
    dispatch(setStatusAC('loading'))
    dispatch(changeEntityStatusAC('loading', id))
    todolistAPI.deleteTodolist(id).then((res) => {
        if (res.data.resultCode === ResulCode.OK) {
            dispatch(removeTodoListAC(id))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(changeEntityStatusAC('failed', id))
        }
    })
        .catch((error) => {
            dispatch(changeEntityStatusAC('failed', id))
            handleServerNetworkError(error, dispatch)
        })
}

export const addTodoListsTC = (title: string): AppThunk => (dispatch: Dispatch<commonTodoListsActionsType | setStatusAC>) => {
    dispatch(setStatusAC('loading'))
    todolistAPI.createTodoList(title).then((res) => {
        if(ResulCode.OK === res.data.resultCode){
            dispatch(addTodoListAC(res.data.data.item, res.data.data.item.id))
            dispatch(setStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTodoListTitleTC = (id: string, title: string): AppThunk => {
    return (dispatch: Dispatch<commonTodoListsActionsType | setStatusAC>) => {
        dispatch(setStatusAC('loading'))
        todolistAPI.updateTodolistTitle(id, title).then(res => {
                if (ResulCode.OK === res.data.resultCode) {
                    dispatch(changeTodolistTitleAC(id, title))
                    dispatch(setStatusAC('succeeded'))
                    dispatch(changeEntityStatusAC('succeeded', id))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export type commonTodoListsActionsType = removeTodoListAC
    | addTodoListAC
    | ReturnType<typeof changeFilterAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeEntityStatusAC>
    | setTodoListsAC ;

export type removeTodoListAC = ReturnType<typeof removeTodoListAC>
export type addTodoListAC = ReturnType<typeof addTodoListAC>
export type setTodoListsAC = ReturnType<typeof setTodoListsAC>

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
