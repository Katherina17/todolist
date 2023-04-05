import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null as null | string, //the second can be type
        isInitialized: false as boolean
    },
    reducers: {
        setStatus: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setError: (state, action:PayloadAction<{error: null | string}>) => {
            state.error = action.payload.error
        },
        setInitialize: (state, action:PayloadAction<{isInitialize: boolean}>) => {
            state.isInitialized = action.payload.isInitialize
        }
    }
})

export const appReducer = slice.reducer;
export const appAction = slice.actions;


