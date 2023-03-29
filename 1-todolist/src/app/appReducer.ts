export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string, //the second can be type
    isInitialized: false as boolean
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        case "APP/SET-INITIALIZE": {
            return {...state, isInitialized: action.isInitialize}
        }
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status: status
    } as const
}

export const setErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error: error
    } as const
}

export const setInitializeAC = (isInitialize: boolean) => {
    return {
        type: 'APP/SET-INITIALIZE',
        isInitialize: isInitialize
    } as const
}

export type setStatusAC = ReturnType<typeof setStatusAC>
export type setErrorAC = ReturnType<typeof setErrorAC>
export type setInitializeAC = ReturnType<typeof setInitializeAC>

export type AppActionsType = setStatusAC | setErrorAC | setInitializeAC