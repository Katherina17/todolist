import {Dispatch} from "redux";
import {appAction} from "app/appReducer";
import {ResponseType} from "common/types";

/**
 * The function handles errors that may occur when an user interacting with the server.
 * @param data  - the server respond, type – ResponseType<D>
 * @param dispatch -  the function for sending the message to Redux store
 * @param showError  a flag indicating whether to display UI errors
 */

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch, showError: boolean = true) => {
     if(showError){
         dispatch(appAction.setError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
     }
    dispatch(appAction.setStatus({status: 'failed'}))
}