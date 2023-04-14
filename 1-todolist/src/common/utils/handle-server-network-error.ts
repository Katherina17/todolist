import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {appAction} from "app/appReducer";

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