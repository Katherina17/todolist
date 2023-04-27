import {AppRootStateType} from "app/store";
import {TasksStateType} from "features/todolists-List/Task/tasks-reducer";


export const tasks = (state: AppRootStateType): TasksStateType => state.tasks