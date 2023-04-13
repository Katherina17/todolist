import { Dispatch } from 'redux'
import {ResponseType} from "../api/todolist-api";
import {appAction} from "app/appReducer";
import axios, {AxiosError} from "axios";



// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appAction.setError({error: data.messages[0]}))
    } else {
        dispatch(appAction.setError({error: 'Some error occurred'}))
    }
    dispatch(appAction.setStatus({status: 'failed'}))
}

export const _handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(appAction.setError({error: error.message}))
    dispatch(appAction.setStatus({status: 'failed'}))
}

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred'
        dispatch(appAction.setError({error}))
    } else {
        dispatch(appAction.setError({error: `Native error ${err.message}`}))
    }
    dispatch(appAction.setStatus({status: 'failed'}))
}
/*
type ErrorUtilsDispatchType = ThunkDispatch<AppStateType, unknown, commonAppActionType>*/
