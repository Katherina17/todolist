
import {modelUpdateTask, taskAPI} from "api/task-api";
import {AppRootStateType, AppThunk} from "app/store";
import {appAction, RequestStatusType} from "app/appReducer";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {todoListActions} from "features/TodoListsList/todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {};


const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTask: (state, action:PayloadAction<{id: string, todoListId: string}>) => {
            let tasks = state[action.payload.todoListId];
            const index = tasks.findIndex(el => el.id === action.payload.id);
            if(index !== -1) tasks.splice(index, 1)
        },

        addTask: (state, action: PayloadAction<{task: TaskType}>) => {
            let tasks = state[action.payload.task.todoListId];
            tasks.unshift(action.payload.task)
        },

        changeTaskStatus: (state, action: PayloadAction<{id: string, status: number, todoListId: string}>) => {
            let tasks = state[action.payload.todoListId];
            let task = tasks.find(el => el.id === action.payload.id)
            if(task){
                task.status = action.payload.status
            }
        },
        changeTaskTitle: (state, action: PayloadAction<{id: string, newTitle: string, todolistId: string}>) => {
            let tasks = state[action.payload.todolistId];
            let task = tasks.find(el => el.id === action.payload.id)
            if(task){
                task.title = action.payload.newTitle
            }
        },
        setTasks: (state, action: PayloadAction<{todolistId: string, tasks: TaskType[]}>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
        changeEntityTaskStatus: (state, action: PayloadAction<{todolistId: string, entityStatus: RequestStatusType, id: string}>) => {
            let tasks = state[action.payload.todolistId];
            let task = tasks.find(el => el.id === action.payload.id)
            if(task){
                task.entityStatus = action.payload.entityStatus
            }
        }


    },
    extraReducers: builder => {
        builder
            .addCase(todoListActions.addTodoList, (state, action) => {
                state[action.payload.newTodolistId] = []
            })
            .addCase(todoListActions.removeTodo, (state, action) => {
                delete state[action.payload.id]
            })
            .addCase(todoListActions.setTodoLists, (state, action) => {
                action.payload.todoLists.forEach(el => {
                    state[el.id] = []
                })
            })
    }
})

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

export const getTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(appAction.setStatus({status: 'loading'}))
    taskAPI.getTasks(todolistId).then(res => {
        if (!res.data.error) {
            dispatch(tasksActions.setTasks({todolistId: todolistId, tasks: res.data.items}))
            dispatch(appAction.setStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data.error, dispatch)
        }
    })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

export const deleteTaskTC = (id: string, todoListId: string):AppThunk => (dispatch) => {
    dispatch(appAction.setStatus({status: 'loading'}))
    dispatch(tasksActions.changeEntityTaskStatus({todolistId: todoListId, entityStatus: 'loading', id: id}))
    taskAPI.deleteTask(todoListId, id).then(res => {
        if(res.data.resultCode === 0){
            dispatch(tasksActions.removeTask({id: id, todoListId: todoListId}))
            dispatch(appAction.setStatus({status: 'succeeded'}))
            dispatch(tasksActions.changeEntityTaskStatus({todolistId: todoListId, entityStatus: 'succeeded', id: id}))
        } else {
            handleServerAppError(res.data, dispatch)
        }

    })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
            dispatch(tasksActions.changeEntityTaskStatus({todolistId: todoListId, entityStatus: 'failed', id: id}))
        })
}


export const addTaskTC = (title: string, todoListId: string): AppThunk => (dispatch) => {
    dispatch(appAction.setStatus({status: 'loading'}))
    taskAPI.createTask(todoListId, title).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(tasksActions.addTask({task: res.data.data.item}))
                dispatch(todoListActions.changeEntityStatus({entityStatus: 'idle', id: res.data.data.item.todoListId}))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(todoListActions.changeEntityStatus({entityStatus: 'failed', id: todoListId}))
            }
            dispatch(appAction.setStatus({status: 'idle'}))
        }
    )
        .catch(error => {
            handleServerNetworkError(error, dispatch)
            dispatch(todoListActions.changeEntityStatus({entityStatus: 'failed', id: todoListId}))
        })
    dispatch(appAction.setStatus({status: 'idle'}))
}


export const updateTaskStatusTC = (id: string, status: TaskStatuses, todoListId: string): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        dispatch(appAction.setStatus({status: 'loading'}))
        dispatch(tasksActions.changeEntityTaskStatus({id: id, entityStatus: 'loading', todolistId: todoListId}))
        let allTasks = getState().tasks;
        let tasksForCurrentTodolist = allTasks[todoListId];
        let currentTask = tasksForCurrentTodolist.find(el => el.id === id)
        if (tasksForCurrentTodolist) {
            let updateModal: modelUpdateTask = {
                title: currentTask!.title,
                startDate: currentTask!.startDate,
                priority: currentTask!.priority,
                description: currentTask!.description,
                deadline: currentTask!.deadline,
                status: status,
                completed: currentTask!.completed
            }
            taskAPI.updateTask(todoListId, id, updateModal).then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(tasksActions.changeTaskStatus({status: status, todoListId: todoListId, id: id}))
                    dispatch(appAction.setStatus({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
                dispatch(tasksActions.changeEntityTaskStatus({id: id, entityStatus: 'succeeded', todolistId: todoListId}))
            })
                .catch(error => {
                    handleServerNetworkError(error, dispatch)
                    dispatch(tasksActions.changeEntityTaskStatus({id: id, entityStatus: 'failed', todolistId: todoListId}))
                })
        }
    }
}

export const updateTaskTitleTC = (id: string, title: string, todoListId: string): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        dispatch(appAction.setStatus({status: 'loading'}))
        dispatch(tasksActions.changeEntityTaskStatus({id: id, entityStatus: 'loading', todolistId: todoListId}))
        let allTasks = getState().tasks;
        let tasksForCurrentTodolist = allTasks[todoListId];
        let currentTask = tasksForCurrentTodolist.find(el => el.id === id)
        if (tasksForCurrentTodolist) {
            let updateModal: modelUpdateTask = {
                title: title,
                startDate: currentTask!.startDate,
                priority: currentTask!.priority,
                description: currentTask!.description,
                deadline: currentTask!.deadline,
                status: currentTask!.status,
                completed: currentTask!.completed
            }
            taskAPI.updateTask(todoListId, id, updateModal).then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(tasksActions.changeTaskTitle({id: id,newTitle: title, todolistId: todoListId }))
                    dispatch(appAction.setStatus({status: 'succeeded'}))
                    dispatch(tasksActions.changeEntityTaskStatus({id: id, entityStatus: 'succeeded', todolistId: todoListId}))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(tasksActions.changeEntityTaskStatus({id: id, entityStatus: 'succeeded', todolistId: todoListId}))
                }
            })
                .catch(error => {
                    handleServerNetworkError(error, dispatch)
                    dispatch(tasksActions.changeEntityTaskStatus({id: id, entityStatus: 'failed', todolistId: todoListId}))
                })
        }
    }
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
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




