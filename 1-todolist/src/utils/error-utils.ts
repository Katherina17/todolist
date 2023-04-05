import { Dispatch } from 'redux'
import {ResponseType} from "../api/todolist-api";
import {appAction} from "app/appReducer";



// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appAction.setError({error: data.messages[0]}))
    } else {
        dispatch(appAction.setError({error: 'Some error occurred'}))
    }
    dispatch(appAction.setStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(appAction.setError({error: error.message}))
    dispatch(appAction.setStatus({status: 'failed'}))
}
/*
type ErrorUtilsDispatchType = ThunkDispatch<AppStateType, unknown, commonAppActionType>*/
