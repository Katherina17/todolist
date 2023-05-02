import {appAction, appReducer, RequestStatusType} from "app/appReducer";

let startState = {
    status: "idle" as RequestStatusType,
    error: null as null | string,
    isInitialized: false as boolean
}

test('set application status', () => {
    const endState = appReducer(startState, appAction.setStatus({status: 'loading'}))
    const endState2 = appReducer(startState, appAction.setStatus({status: 'succeeded'}))

    expect(startState.status).toBe('idle')
    expect(endState.status).toBe('loading')
    expect(endState2.status).toBe('succeeded')
})



test('set some error', () => {
    const endState = appReducer(startState, appAction.setError({error: 'Network Error'}))

    expect(startState.error).toBe(null)
    expect(endState.error).toBe('Network Error')
})



test('initialize application', () => {
    const endState = appReducer(startState, appAction.setInitialize({isInitialize: true}))

    expect(startState.isInitialized).toBe(false)
    expect(endState.isInitialized).toBe(true)
})