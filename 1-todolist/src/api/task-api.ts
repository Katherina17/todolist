import axios from "axios";
import {TaskType} from "../state/tasks-reducer";

const instance = axios.create({
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
        return instance.post<ResponseType>(`todo-lists/${todolistID}/tasks`,{title})
    },
    deleteTask(todoListID: string, taskID: string){
        return instance.delete<ResponseType>(`/todo-lists/${todoListID}/tasks/${taskID}`)
    },
    updateTaskTitle(todoListID: string, taskID: string, title: string){
        return instance.put<ResponseType>(`/todo-lists/${todoListID}/tasks/${taskID}`, {title})
    }

}

type getTaskType = {
    error: null,
    items: TaskType[],
    totalCount: number
}



type ResponseType<T = TaskType> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: T
}




