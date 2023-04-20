import {todolistAPI, TodoListType} from "features/TodoListsList/todolist-api";
import {appAction, RequestStatusType} from "app/appReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "common/utils/create-app-async-thunk";
import {handleServerAppError, handleServerNetworkError} from "common/utils";
import {FilterValuesType, ValidTodoListType} from "common/api/common.api";
import {ResulCode} from "common/enums";


const initialState: ValidTodoListType[] = [];


const getTodoLists = createAppAsyncThunk<TodoListType[]>('todolists/getTodoLists', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(appAction.setStatus({status: 'loading'}))
    try{
        let res = await todolistAPI.getTodoList();
            if(res.data){
                let todoLists:TodoListType[] = res.data
                return todoLists

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
        dispatch(appAction.setStatus({status: 'succeeded'}))
    }
})

type DeleteTodoList = {
    id: string
}

const deleteTodoList = createAppAsyncThunk<DeleteTodoList, DeleteTodoList>('todolists/deleteTodoList', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(appAction.setStatus({status: 'loading'}))
    dispatch(todoListActions.changeEntityStatus({entityStatus: 'loading', id: arg.id}))
    try{
        let res = await todolistAPI.deleteTodolist(arg.id)
            if (res.data.resultCode === ResulCode.OK) {
                return {id: arg.id}
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
        dispatch(todoListActions.changeEntityStatus({entityStatus: 'idle', id: arg.id}))
    }
})

type addTodoPayloadReturnType = {
    todoList: TodoListType,
    newTodolistId: string
}

const addTodoList = createAppAsyncThunk<addTodoPayloadReturnType, {title: string}>('todolists/addTodoList', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(appAction.setStatus({status: 'loading'}))
    try{
        let res = await todolistAPI.createTodoList(arg.title)
            if(ResulCode.OK === res.data.resultCode){
               return {todoList: res.data.data.item, newTodolistId: res.data.data.item.id}
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

type updateTodoListTitleReturnType = {
    id: string,
    title: string
}

const updateTodoListTitle = createAppAsyncThunk<updateTodoListTitleReturnType, updateTodoListTitleReturnType>('todolists/updateTodoListTitle', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(appAction.setStatus({status: 'loading'}))
    dispatch(todoListActions.changeEntityStatus({entityStatus: 'loading', id: arg.id}))
    try{
        let res = await todolistAPI.updateTodolistTitle(arg.id, arg.title)
            if (ResulCode.OK === res.data.resultCode) {
            return {id: arg.id, title: arg.title}
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
        dispatch(todoListActions.changeEntityStatus({entityStatus: 'succeeded', id: arg.id}))
    }
} )


const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
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
        clearTodolists: () => {
            return []
        }
    },
    extraReducers: builder => {
      builder
          .addCase(todoListThunks.getTodoLists.fulfilled, (state, action) => {
              return action.payload.map(td => ({...td, filter: 'all', entityStatus: 'idle'}))
          })
          .addCase(todoListThunks.deleteTodoList.fulfilled, (state, action) => {
              const index = state.findIndex(todo => todo.id === action.payload.id);
              if (index !== -1) state.splice(index, 1)
          })
          .addCase(todoListThunks.addTodoList.fulfilled, (state, action) => {
              const newTodoList:ValidTodoListType = {...action.payload.todoList, filter: 'all', entityStatus: 'idle'}
              state.unshift(newTodoList)
          })
          .addCase(todoListThunks.updateTodoListTitle.fulfilled, (state, action) => {
              const todo = state.find(todo => todo.id === action.payload.id) //find an object
              if(todo){
                  todo.title = action.payload.title
              }
          })
    }

})

export const TodoListReducer = slice.reducer;
export const todoListActions = slice.actions;
export const todoListThunks = {getTodoLists, deleteTodoList, addTodoList, updateTodoListTitle}




const top10 = 'top10'
enum ButtonName{
    top10 = 'Топ-10',
    top20= 'Топ-20',
    img = 'Изображение'
} // для чего нужны enum

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
