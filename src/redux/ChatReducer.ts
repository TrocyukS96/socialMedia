import {chatAPI} from "../api/api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./appReducer";
import {ChannelMessage, ChannelsResponse, CreateChannelParams} from "../api/types/channels";
import {setErrorAc} from "./AuthReducer";
import {ChannelParams} from "../api/types/post";

const initialState = {
    channels: [] as ChannelsResponse[],
    messages:[] as ChannelMessage[]
}

export const chatReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CHANNELS/SET-CHANNELS':
            return { ...state, channels: action.payload }
        case "CHANNELS/SET-CHANNEL-MESSAGES": {
            return {...state, messages: action.payload}
        }
        default:
            return state
    }
}

//actions
export const setChannels = (payload: ChannelsResponse[]) => {
    return {
        type: "CHANNELS/SET-CHANNELS",
        payload
    } as const
}
export const setChannelMessages = (payload: ChannelMessage[]) => {
    return {
        type: "CHANNELS/SET-CHANNEL-MESSAGES",
        payload
    } as const
}

//thunks
export const getChannels = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await chatAPI.setChannels()
        console.log(res.data.data)
        dispatch(setChannels(res.data.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}

export const createChannel = (params:CreateChannelParams) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    const createParamsData = {
        name: params.create_params.name,
        type: params.create_params.type,
        members_ids:params.create_params.members_ids
    }
    const addImageData = {
        image: params.image,
    }
    const formData= new FormData()
    formData.append('create_params',JSON.stringify(createParamsData))
    // @ts-ignore
    formData.append('image',addImageData.image)
    try {
        await chatAPI.createChannel(formData)
        // @ts-ignore
        dispatch(getChannels())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}

export const getMessagesById = (id:number,params:ChannelParams) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await chatAPI.fetchMessagesById(id,params)
        console.log(res.data.data)
        dispatch(setChannelMessages(res.data.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}

export const startMessagesListening = (id:number) => async (dispatch:Dispatch) => {
    chatAPI.startMessagesListening(id)

}


//type
type InitialStateType = typeof initialState

type ActionsType =
    | ReturnType<typeof setChannels>
    | ReturnType<typeof setChannelMessages>


