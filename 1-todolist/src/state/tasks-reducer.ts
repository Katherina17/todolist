import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";

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
            let task:TaskType = {addedDate: '', deadline: null, description: null, id: v1(), order: 0, priority: TaskPriorities.Low,
                startDate: null, status: TaskStatuses.New, title: action.payload.title, todoListId: action.payload.todoListId};
            return {...state, [action.payload.todoListId]: [task, ...state[action.payload.todoListId]]}
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
        default:
            return state
    }
}

type commonActionsType = removeTaskAC | addTaskAC | changeTaskStatusAC | changeTaskTitleAC | addTodoListAC  | removeTodoListAC;

type removeTaskAC = ReturnType<typeof removeTaskAC>
type addTaskAC = ReturnType<typeof addTaskAC>
type changeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>


export const removeTaskAC = (id: string, todoListId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {id, todoListId}
    } as const
}

export const addTaskAC = (title: string, todoListId: string) => {
    return {
        type: 'ADD-TASK',
        payload: {title, todoListId}
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
}




