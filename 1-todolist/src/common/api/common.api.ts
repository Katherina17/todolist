import {TodoListType} from "features/todolists-List/todolists/todolists-api";
import {RequestStatusType} from "app/appReducer";
import axios from "axios";

export type FilterValuesType = "all" | "active" | "completed";


export type ValidTodoListType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    /*headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '43a60f90-0234-478e-9be6-fcfce5403846',
    },*/
})
