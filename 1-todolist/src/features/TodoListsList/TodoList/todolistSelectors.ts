import {AppRootStateType} from "app/store";
import {TasksStateType} from "features/TodoListsList/tasks-reducer";


export const tasks = (state: AppRootStateType): TasksStateType => state.tasks