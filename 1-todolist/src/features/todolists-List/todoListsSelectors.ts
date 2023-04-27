import {AppRootStateType} from "app/store";
import {TodolistType} from "features/todolists-List/todolists/todolists-reducer";

export const todolists = (state: AppRootStateType): TodolistType[] => state.todolists