import {ResponseType} from "common/types/common.types";
import {instance} from "common/api/common.api";


export const todolistAPI = {
    getTodoList(){
        return instance.get<TodoListType[]>('todo-lists')
    },
    createTodoList(title:string){
        return instance.post<ResponseType<{item: TodoListType}>>('todo-lists',{title})
    },
    deleteTodolist(todoListID: string){
        return instance.delete<ResponseType>(`todo-lists/${todoListID}`)
    },
    updateTodolistTitle(todoListID: string, title: string){
        return instance.put<ResponseType>(`todo-lists/${todoListID}`, {title})
    }

}

//types

export type TodoListType = {
    addedDate: string,
    id: string,
    order: number,
    title: string
}






