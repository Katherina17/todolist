import {TasksStateType} from "../App";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./todolists-reducer";
import {Dispatch} from "redux";
import {modelUpdateTask, taskAPI} from "../api/task-api";
import {AppRootStateType} from "./store";

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: commonActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.id)
            }
        }
        case "ADD-TASK": {
            return {...state, [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.id ? {
                    ...el,
                    status: action.payload.status
                } : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state, [action.payload.newTodolistId] : []
            }
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        case "SET_TODOLISTS": {
            let copyState = {...state}

            action.payload.todoLists.forEach(td => {
                copyState[td.id] = []
            })

            return copyState;
        }
        case "SET_TASKS": {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        }
        default:
            return state
    }
}

type commonActionsType = removeTaskAC
    | addTaskAC
    | changeTaskStatusAC
    | changeTaskTitleAC
    | addTodoListAC
    | removeTodoListAC
    | setTodoListsAC
    | setTasksAC;

type removeTaskAC = ReturnType<typeof removeTaskAC>
type addTaskAC = ReturnType<typeof addTaskAC>
type changeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>
type setTasksAC = ReturnType<typeof setTasksAC>


export const removeTaskAC = (id: string, todoListId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todoListId}
    } as const
}

export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {task}
    } as const
}

export const changeTaskStatusAC = (id: string, status: number, todoListId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {id, status, todoListId}
    } as const
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {id, newTitle, todolistId}
    } as const
}


export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET_TASKS',
        payload: {todolistId, tasks}
    } as const
}



export const getTasksTC = (todolistId: string) => {
   return (dispatch: Dispatch) => {
       taskAPI.getTasks(todolistId).then(res => {
           dispatch(setTasksAC(todolistId,res.data.items))
       })
   }
}

export const deleteTaskTC = (id: string, todoListId: string) => {
   return (dispatch: Dispatch) => {
       taskAPI.deleteTask(todoListId, id).then(res => {
               dispatch(removeTaskAC(id, todoListId))
       })
   }
}


export const addTaskTC = (title: string, todoListId: string) => {
   return (dispatch: Dispatch) => {
       taskAPI.createTask(todoListId, title).then(res => {
           dispatch(addTaskAC(res.data.data.item))
       })
   }
}


export const updateTaskStatusTC = (id: string, status: TaskStatuses, todoListId: string) => {
   return (dispatch: Dispatch, getState: () => AppRootStateType) => {
       let allTasks = getState().tasks;
       let tasksForCurrentTodolist = allTasks[todoListId];
            let currentTask = tasksForCurrentTodolist.find(el => el.id === id)
            if(tasksForCurrentTodolist){
                let updateModal:modelUpdateTask = {
                    title: currentTask!.title,
                    startDate: currentTask!.startDate,
                    priority: currentTask!.priority,
                    description: currentTask!.description,
                    deadline: currentTask!.deadline,
                    status: status,
                    completed: currentTask!.completed
                }
                taskAPI.updateTask(todoListId, id, updateModal).then(res => {
                    console.log(res)
                    dispatch(changeTaskStatusAC(id, status, todoListId))
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
}


