import {ResponseType} from "common/api/todolist-api";
import {Dispatch} from "redux";
import {appAction} from "app/appReducer";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appAction.setError({error: data.messages[0]}))
    } else {
        dispatch(appAction.setError({error: 'Some error occurred'}))
    }
    dispatch(appAction.setStatus({status: 'failed'}))
}