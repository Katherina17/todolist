import {TasksStateType, TodolistType} from "../App";
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
            let task = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todoListId]: [task, ...state[action.payload.todoListId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.id ? {
                    ...el,
                    isDone: action.payload.isDone
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

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {id, isDone, todoListId}
    } as const
}

export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {id, newTitle, todolistId}
    } as const
}




