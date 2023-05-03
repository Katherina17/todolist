import {AuthInitialStateType, authReducer, authThunks} from "features/Login/auth-reducer";

let startState: AuthInitialStateType = {
    isLoggedIn: false,
    user: {
        id: null,
        login: null,
        email: null,
    },
    captcha: null
}

const params = {email: 'ivanio@gmail.com', id: 111, login: 'ivan74', isLoggedIn: true}

beforeEach(() => {
    startState = {
        isLoggedIn: false,
        user: {
            id: null,
            login: null,
            email: null,
        },
        captcha: null
    }
})

test('user should be logged in', () => {
    const action = authThunks.login.fulfilled(
        {isLoggedIn: true},
        'requestedID',
        {rememberMe: true, email: 'fefe', password: 'fefef'})

    const endLoginState = authReducer(startState, action);

    expect(endLoginState.isLoggedIn).toBe(true)
    expect(startState.isLoggedIn).toBe(false)
    expect(startState.user.id).toBe(null)
    expect(startState.user.login).toBe(null)
    expect(startState.user.email).toBe(null)
})


test('user should be logged out', () => {

   const startStateLogOut:AuthInitialStateType = {
        isLoggedIn: true,
        user: {
            id: 123,
            login: 'ivan76',
            email: 'ivan21@gmail.com',
        },
       captcha: null
    }

    const action = authThunks.logOut.fulfilled({isLoggedIn: false}, 'requestedID')

    const endLogOutState = authReducer(startStateLogOut, action);

    expect(startStateLogOut.isLoggedIn).toBe(true)
    expect(startStateLogOut.user.email).toBe('ivan21@gmail.com')
    expect(startStateLogOut.user.id).toBe(123)
    expect(startStateLogOut.user.login).toBe('ivan76')
    expect(endLogOutState.isLoggedIn).toBe(false)
    expect(endLogOutState.user.id).toBe(null)
    expect(endLogOutState.user.login).toBe(null)
    expect(endLogOutState.user.email).toBe(null)
})

test('initialize app and get the user data', () => {

    const action = authThunks.initializeApp.fulfilled(params, 'requestedID')

    const endState = authReducer(startState, action);

    expect(startState.isLoggedIn).toBe(false)
    expect(startState.user.email).toBe(null)
    expect(startState.user.id).toBe(null)
    expect(startState.user.login).toBe(null)
    expect(endState.isLoggedIn).toBe(true)
    expect(endState.user.id).toBe(111)
    expect(endState.user.login).toBe('ivan74')
    expect(endState.user.email).toBe('ivanio@gmail.com')
})

test('get captcha', () => {
    const action = authThunks.getCaptchaUrl.fulfilled({captcha: 'dnwdhuwd'}, 'requestedID')

    const endState = authReducer(startState, action);

    expect(startState.captcha).toBe(null)
    expect(startState.user.email).toBe(null)
    expect(startState.user.id).toBe(null)
    expect(startState.user.login).toBe(null)
    expect(endState.captcha).toBe('dnwdhuwd')

})