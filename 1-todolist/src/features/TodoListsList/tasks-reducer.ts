import {modelUpdateTask, taskAPI} from "api/task-api";
import {appAction, RequestStatusType} from "app/appReducer";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {ResulCode, todoListActions, todoListThunks} from "features/TodoListsList/todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "utils/create-app-async-thunk";

const initialState: TasksStateType = {};

const getTasks = createAppAsyncThunk<{tasks: TaskType[], todolistId:string}, string>('tasks/getTasks', async (todolistId, thunkAPI) => { //arg это как наши todolistID, thunkAPI - give dispatch
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(appAction.setStatus({status: 'loading'}))
    try{
        const res = await taskAPI.getTasks(todolistId)
        const tasks:TaskType[] = res.data.items
        return {tasks, todolistId}
    }
    catch (error){ //сюда попадают и js ошибки
        handleServerNetworkError(error, dispatch)
        return rejectWithValue(null)
    }
    finally {
        dispatch(appAction.setStatus({status: 'succeeded'}))
    }
//thunk должна что-то возвращать
//типизация, первое – что возвращает, второе – что принимает, третье – AsyncThunkConfig
})


const addTask = createAppAsyncThunk<{ task: TaskType }, {todolistId: string, title: string}>('tasks/addTask', async (args, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI;
        dispatch(appAction.setStatus({status: 'loading'}))
        try {
            let res = await taskAPI.createTask(args.todolistId, args.title)
            dispatch(todoListActions.changeEntityStatus({entityStatus: 'idle', id: res.data.data.item.todoListId}))

            if(res.data.resultCode === ResulCode.OK){
                let task = res.data.data.item
                return {task}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }

        } catch (e) {
            handleServerNetworkError(e, dispatch)
            dispatch(todoListActions.changeEntityStatus({entityStatus: 'failed', id: args.todolistId}))
            return rejectWithValue(null)
        } finally {
            dispatch(appAction.setStatus({status: 'idle'}))
        }
    }
)

type updateTaskStatus = {
    id: string
    status: number
    todoListId: string
}

const updateTaskStatus = createAppAsyncThunk<updateTaskStatus, updateTaskStatus>
('tasks/updateTaskStatus', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI;
    dispatch(appAction.setStatus({status: 'loading'}))
    dispatch(tasksActions.changeEntityTaskStatus({id: arg.id, entityStatus: 'loading', todolistId: arg.todoListId}))
    try {
        let allTasks = getState().tasks;
        let tasksForCurrentTodolist = allTasks[arg.todoListId];
        let currentTask = tasksForCurrentTodolist.find(el => el.id === arg.id)
        if (tasksForCurrentTodolist) {
            let updateModal: modelUpdateTask = {
                title: currentTask!.title,
                startDate: currentTask!.startDate,
                priority: currentTask!.priority,
                description: currentTask!.description,
                deadline: currentTask!.deadline,
                status: arg.status,
                completed: currentTask!.completed
            }
            const res = await taskAPI.updateTask(arg.todoListId, arg.id, updateModal)
                if (res.data.resultCode === ResulCode.OK) {
                   return {status: arg.status, todoListId: arg.todoListId, id: arg.id}
                } else {
                    handleServerAppError(res.data, dispatch)
                    return  rejectWithValue(null)
                }
            } else {
                return rejectWithValue(null)
            }
    }
    catch (e) {
            handleServerNetworkError(e, dispatch)
            dispatch(tasksActions.changeEntityTaskStatus({
                id: arg.id,
                entityStatus: 'failed',
                todolistId: arg.todoListId
            }))
            return rejectWithValue(null)
        }
    finally {
        dispatch(appAction.setStatus({status: 'idle'}))
        dispatch(appAction.setStatus({status: 'succeeded'}))
        dispatch(tasksActions.changeEntityTaskStatus({id: arg.id, entityStatus: 'succeeded', todolistId: arg.todoListId}))
        }
    }
)

type UpdateTaskTitle = {
    id: string
    title: string
    todoListId: string
}

type UpdateNewTaskTitle = {
    id: string
    newTitle: string
    todoListId: string
}

const updateTaskTitle = createAppAsyncThunk<UpdateNewTaskTitle, UpdateTaskTitle>('tasks/updateTaskTitle', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue, getState} = thunkAPI;
    dispatch(appAction.setStatus({status: 'loading'}))
    dispatch(tasksActions.changeEntityTaskStatus({id: arg.id, entityStatus: 'loading', todolistId: arg.todoListId}))
    try {
        let allTasks = getState().tasks;
        let tasksForCurrentTodolist = allTasks[arg.todoListId];
        let currentTask = tasksForCurrentTodolist.find(el => el.id === arg.id)
        if (tasksForCurrentTodolist) {
            let updateModal: modelUpdateTask = {
                title: arg.title,
                startDate: currentTask!.startDate,
                priority: currentTask!.priority,
                description: currentTask!.description,
                deadline: currentTask!.deadline,
                status: currentTask!.status,
                completed: currentTask!.completed
            }
            const res = await taskAPI.updateTask(arg.todoListId, arg.id, updateModal)
            if (res.data.resultCode === ResulCode.OK) {
              return {id: arg.id, newTitle: arg.title, todoListId: arg.todoListId,}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } else {
            return rejectWithValue(null)
        }
    }
    catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(tasksActions.changeEntityTaskStatus({
            id: arg.id,
            entityStatus: 'failed',
            todolistId: arg.todoListId
        }))
        return rejectWithValue(null)
    }
    finally {
        dispatch(appAction.setStatus({status: 'idle'}))
        dispatch(tasksActions.changeEntityTaskStatus({id: arg.id, entityStatus: 'succeeded', todolistId: arg.todoListId}))
    }
}
)


type DeleteTask = {
    id: string,
    todoListId: string
}

const deleteTask = createAppAsyncThunk<DeleteTask, DeleteTask>('tasks/deleteTask', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    dispatch(appAction.setStatus({status: 'loading'}))
    dispatch(tasksActions.changeEntityTaskStatus({todolistId: arg.todoListId, entityStatus: 'loading', id: arg.id}))
    try {
        const res = await taskAPI.deleteTask(arg.todoListId, arg.id)
            if(res.data.resultCode === ResulCode.OK){
                dispatch(tasksActions.changeEntityTaskStatus({todolistId: arg.todoListId, entityStatus: 'succeeded', id: arg.id}))
                return {id: arg.id, todoListId: arg.todoListId}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
    }
    catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(tasksActions.changeEntityTaskStatus({
            id: arg.id,
            entityStatus: 'failed',
            todolistId: arg.todoListId
        }))
        return rejectWithValue(null)
    }
    finally {
        dispatch(appAction.setStatus({status: 'idle'}))
        dispatch(tasksActions.changeEntityTaskStatus({id: arg.id, entityStatus: 'succeeded', todolistId: arg.todoListId}))
    }
})

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        changeEntityTaskStatus: (state, action: PayloadAction<{todolistId: string, entityStatus: RequestStatusType, id: string}>) => {
            let tasks = state[action.payload.todolistId];
            let task = tasks.find(el => el.id === action.payload.id)
            if(task){
                task.entityStatus = action.payload.entityStatus
            }
        },
        clearTasks: () => {
            return {}
        }

    },
    extraReducers: builder => {
        builder
            .addCase(todoListThunks.addTodoList.fulfilled, (state, action) => {
                state[action.payload.newTodolistId] = []
            })
            .addCase(todoListThunks.deleteTodoList.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todoListThunks.getTodoLists.fulfilled, (state, action) => {
                action.payload.forEach(el => {
                    state[el.id] = []
                })
            })
            .addCase(getTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                let tasks = state[action.payload.task.todoListId];
                tasks.unshift(action.payload.task)
            })
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                let tasks = state[action.payload.todoListId];
                let task = tasks.find(el => el.id === action.payload.id)
                if(task){
                    task.status = action.payload.status
                }
            })
            .addCase(updateTaskTitle.fulfilled, (state, action) => {
                let tasks = state[action.payload.todoListId];
                let task = tasks.find(el => el.id === action.payload.id)
                if(task){
                    task.title = action.payload.newTitle
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                let tasks = state[action.payload.todoListId];
                const index = tasks.findIndex(el => el.id === action.payload.id);
                if(index !== -1) tasks.splice(index, 1)
            })
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {getTasks, addTask, updateTaskStatus, updateTaskTitle, deleteTask}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low= 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}



export type TaskType = {
    addedDate: string
    deadline: null | string
    description: null | string
    id: string
    order: number
    priority: TaskPriorities
    startDate: null | string
    status: TaskStatuses
    title: string
    todoListId: string
    completed: boolean
    entityStatus: RequestStatusType
}


export type TasksStateType = {
    [key: string]: Array<TaskType>
}




