import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AppRootStateType, AppThunkDispatch} from "app/store";
import {appAction} from "app/appReducer";
import {handleServerNetworkError} from "common/utils/handle-server-network-error";
import {ResponseType} from "common/types";

export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<AppRootStateType, any, AppThunkDispatch, null | ResponseType>, logic: Function) => {
    const {dispatch, rejectWithValue} = thunkAPI
    dispatch(appAction.setStatus({status: 'loading'}))
    try {
        return await logic()
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    } finally {
        dispatch(appAction.setStatus({status: 'idle'}))
    }
}