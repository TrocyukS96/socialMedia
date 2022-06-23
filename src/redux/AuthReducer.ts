import {Dispatch} from 'react';
import {
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType, SetIsAuthAC,
    setIsAuthAC,
    SetIsInitializedAC,
    setIsInitializedAC
} from "./appReducer";
import {LoginParamsType, LoginResponse, LogOutParamsType} from "../api/types/auth";
import {authAPI} from "../api/api";

const initialState = {
    isLoggedIn: false,
    loginError: '',
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-ERROR':
            return {...state, loginError: action.errorValue}
        default:
            return state
    }
}

//actionCreators
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setErrorAc = (errorValue: string) => ({type: 'login/SET-ERROR', errorValue} as const)

//thunks
export const getAuthData = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.me()
        dispatch(setIsInitializedAC(true))
        dispatch(setIsAuthAC(true))
        dispatch(setAppStatusAC('succeeded'))

    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message)
        dispatch(setAppErrorAC(error))
        dispatch(setAppStatusAC('failed'))
    } finally {
        dispatch(setIsInitializedAC(true))
    }
}

export const login = (data: LoginParamsType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res: LoginResponse = await authAPI.login(data)
        dispatch(setIsLoggedInAC(true))
        dispatch(setIsAuthAC(true))
        dispatch(setAppStatusAC('succeeded'))
        localStorage.setItem('access_token', res.access_token)
        localStorage.setItem('refresh_token', res.refresh_token)
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setErrorAc(error))
        dispatch(setAppStatusAC('failed'))
    }
}

export const logout = (data: LogOutParamsType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await authAPI.logOut(data)
        console.log(res)
        dispatch(setIsLoggedInAC(false))
        dispatch(setIsAuthAC(false))
        dispatch(setAppStatusAC('succeeded'))
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}

//type
type InitialStateType = typeof initialState
type SetErrorActionType = ReturnType<typeof setErrorAc>
export type setLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
type ActionsType =
    setLoggedInActionType
    | SetAppStatusActionType
    | SetErrorActionType
    | SetAppErrorActionType
    | SetIsInitializedAC
    | SetIsAuthAC
    | ReturnType<typeof setIsAuthAC>



