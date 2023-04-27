import {TaskType} from "features/todolists-List/task/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "common/enums/common.enums";
import {instance} from "common/api/common.api";
import {ResponseType} from "common/types";



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





