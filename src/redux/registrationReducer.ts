import { Dispatch } from 'redux';
import { RegisterParamsType } from "../api/types/auth";
import { authAPI } from "../api/api";
import { setAppStatusAC } from './appReducer';
import { login } from "./AuthReducer";

const initialStateRegistration: RegistrationType = {
    isRegistration: false,
    error: ''
}

export const registrationReducer = (state: RegistrationType = initialStateRegistration, action: ActionsType): RegistrationType => {
    switch (action.type) {
        case 'REGISTRATION/NEW-USER-CREATED':
            return { ...state, isRegistration: action.isRegistration, error: '' }
        case 'REGISTRATION/SET-ERROR':
            return { ...state, error: action.value };
        default:
            return state
    }
}

//actionCreators
export const registrationAC = (isRegistration: boolean) =>
    ({ type: 'REGISTRATION/NEW-USER-CREATED', isRegistration } as const)
export const setErrorAC = (value: string) =>
    ({ type: 'REGISTRATION/SET-ERROR', value } as const)

//thunk
export const registrationTC = (data: RegisterParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await authAPI.register(data)
        dispatch(registrationAC(true))
    } catch (e) {
        const error = e.response
            ? e.response.data.error
            : (e.message)
        dispatch(setErrorAC(error))
    } finally {
        dispatch(setAppStatusAC('succeeded'))
        setTimeout(() => {
            dispatch(setAppStatusAC('idle'))
        }, 3000)
    }
}

//types
type RegistrationType = {
    isRegistration: boolean
    error: string
}


type ActionsType = ReturnType<typeof registrationAC> | ReturnType<typeof setErrorAC>




