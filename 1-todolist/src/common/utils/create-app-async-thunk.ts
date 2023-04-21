import {AppRootStateType, AppThunkDispatch} from "app/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {ResponseType} from "common/types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppThunkDispatch
    rejectValue: null | ResponseType
}>()