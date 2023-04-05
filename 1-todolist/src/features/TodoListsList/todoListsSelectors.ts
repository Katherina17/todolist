import {AppRootStateType} from "app/store";
import {TodolistType} from "features/TodoListsList/todolists-reducer";

export const todolists = (state: AppRootStateType): TodolistType[] => state.todolists