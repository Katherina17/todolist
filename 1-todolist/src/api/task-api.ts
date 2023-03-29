import axios from "axios";
import {TaskPriorities, TaskStatuses, TaskType} from "../features/TodoListsList/tasks-reducer";

export const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        /*headers: {
            // Не забываем заменить API-KEY на собственный
            'API-KEY': '43a60f90-0234-478e-9be6-fcfce5403846',
        },*/
    })

export const taskAPI = {
    getTasks(todolistID: string){
        return instance.get<getTaskType>(`todo-lists/${todolistID}/tasks`)
    },
    createTask(todolistID: string, title:string){
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistID}/tasks`,{title})
    },
    deleteTask(todoListID: string, taskID: string){
        return instance.delete<ResponseType>(`/todo-lists/${todoListID}/tasks/${taskID}`)
    },
    updateTask(todoListID: string, taskID: string, payload: modelUpdateTask){
        return instance.put<ResponseType>(`/todo-lists/${todoListID}/tasks/${taskID}`, payload)
    }

}

//types

type getTaskType = {
    error: null,
    items: TaskType[],
    totalCount: number
}

export type modelUpdateTask = {
    title: string,
    description: string | null,
    completed: boolean,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string | null,
    deadline: string | null,

}

type ResponseType<T = TaskType> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: T
}




