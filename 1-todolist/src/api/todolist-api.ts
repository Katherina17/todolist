import axios from "axios";

const instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        /*headers: {
            // Не забываем заменить API-KEY на собственный
            'API-KEY': '43a60f90-0234-478e-9be6-fcfce5403846',
        },*/
    })

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

type TodoListType = {
    addedDate: string,
    id: string,
    order: number,
    title: string
}

type ResponseType<T = {}> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: T
}




