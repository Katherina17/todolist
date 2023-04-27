import {AppRootStateType} from "app/store";
import {TasksStateType} from "features/todolists-List/todolists/Todolist/Tasks/Task/tasks-reducer";


export const tasks = (state: AppRootStateType): TasksStateType => state.tasks