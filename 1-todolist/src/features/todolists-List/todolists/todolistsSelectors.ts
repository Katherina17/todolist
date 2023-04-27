import {AppRootStateType} from "app/store";
import {TasksStateType} from "features/todolists-List/task/tasks-reducer";


export const tasks = (state: AppRootStateType): TasksStateType => state.tasks