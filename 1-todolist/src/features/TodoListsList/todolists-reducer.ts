import {FilterValuesType, ValidTodoListType} from "trash/App";
import {todolistAPI, TodoListType} from "api/todolist-api";
import {appAction, RequestStatusType} from "app/appReducer";
import { AppThunk} from "app/store";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: ValidTodoListType[] = [];

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodo: (state, action:PayloadAction<{id: string}>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id); //find index
            if (index !== -1) state.splice(index, 1) //delete element, it's mutatted (index - element index, 1 - count)
        },
        addTodoList: (state, action:PayloadAction<{todoList: TodoListType, newTodolistId: string}>) => {
            const newTodoList:ValidTodoListType = {...action.payload.todoList, filter: 'all', entityStatus: 'idle'}
            state.unshift(newTodoList)
        },
        changeTodolistTitle: (state, action:PayloadAction<{id: string, title: string}>) => {
            const todo = state.find(todo => todo.id === action.payload.id) //find an object
            if(todo){
                todo.title = action.payload.title
            }
        },
        changeFilter: (state, action:PayloadAction<{value: FilterValuesType, id: string}>) => {
            const todo = state.find(todo => todo.id === action.payload.id) //find an object
            if(todo){
                todo.filter = action.payload.value
            }
        },
        changeEntityStatus: (state, action:PayloadAction<{entityStatus: RequestStatusType, id: string}>) => {
            const todo = state.find(todo => todo.id === action.payload.id) //find an object
            if(todo){
                todo.entityStatus = action.payload.entityStatus
            }
        },
        setTodoLists: (state, action:PayloadAction<{todoLists: TodoListType[]}>) => {
            return action.payload.todoLists.map(td => ({...td, filter: 'all', entityStatus: 'idle'})) //foreacch
        },

    },

})

export const TodoListReducer = slice.reducer;
export const todoListActions = slice.actions;


export const getTodoListsTC = (): AppThunk => (dispatch) => {
    dispatch(appAction.setStatus({status: 'loading'}))
    todolistAPI.getTodoList().then((res) => {
        if(res.data){
            dispatch(todoListActions.setTodoLists({todoLists: res.data}))
            dispatch(appAction.setStatus({status: 'succeeded'}))
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
    dispatch(appAction.setStatus({status: 'loading'}))
    dispatch(todoListActions.changeEntityStatus({entityStatus: 'loading', id: id}))
    todolistAPI.deleteTodolist(id).then((res) => {
        if (res.data.resultCode === ResulCode.OK) {
            dispatch(todoListActions.removeTodo({id: id}))
            dispatch(appAction.setStatus({status: 'idle'}))
        } else {
            handleServerAppError(res.data, dispatch)
            dispatch(todoListActions.changeEntityStatus({entityStatus: 'failed', id: id}))
        }
    })
        .catch((error) => {
            dispatch(todoListActions.changeEntityStatus({entityStatus: 'failed', id: id}))
            handleServerNetworkError(error, dispatch)
        })
}

export const addTodoListsTC = (title: string): AppThunk => (dispatch) => {
    dispatch(appAction.setStatus({status: 'loading'}))
    todolistAPI.createTodoList(title).then((res) => {
        if(ResulCode.OK === res.data.resultCode){
            dispatch(todoListActions.addTodoList({todoList: res.data.data.item, newTodolistId: res.data.data.item.id}))
            dispatch(appAction.setStatus({status: 'idle'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTodoListTitleTC = (id: string, title: string): AppThunk => {
    return (dispatch) => {
        dispatch(appAction.setStatus({status: 'loading'}))
        todolistAPI.updateTodolistTitle(id, title).then(res => {
                if (ResulCode.OK === res.data.resultCode) {
                    dispatch(todoListActions.changeTodolistTitle({id: id, title: title}))
                    dispatch(appAction.setStatus({status: 'idle'}))
                    dispatch(todoListActions.changeEntityStatus({entityStatus: 'succeeded', id: id}))
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

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
