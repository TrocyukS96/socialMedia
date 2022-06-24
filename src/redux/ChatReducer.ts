import { chatAPI } from "../api/api";
import { Dispatch } from "redux";
import { ThunkAction } from 'redux-thunk';
import { AppRootType } from "./redux-store";
import { setAppStatusAC } from "./appReducer";
import { ChannelsResponse, CreateChannel, EditChannel, GetMessages, LastMessage } from "../api/types/channels";
import { setErrorAc } from "./AuthReducer";

const initialState = {
    channels: {} as ChannelsResponse,
}

export const chatReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CHANNELS/SET-CHANNELS':
            return { ...state, channels: action.payload }
        default:
            return state
    }
}

//actions
export const setChannels = (payload: ChannelsResponse) => {
    return {
        type: "CHANNELS/SET-CHANNELS",
        payload
    } as const
}

//thunks
export const getChannels = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await chatAPI.setChannels()
        dispatch(setChannels(res.data.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}

//type
type InitialStateType = typeof initialState

type ActionsType =
    | ReturnType<typeof setChannels>


type ThunkType = ThunkAction<any, AppRootType, {}, ActionsType>