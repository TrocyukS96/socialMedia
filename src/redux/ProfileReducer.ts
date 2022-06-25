import {Dispatch} from "redux";
import {AppRootType} from "./redux-store";
import {ThunkAction} from 'redux-thunk';
import {ProfileResponse, UpdateProfileParams} from "../api/types/profile";
import {CommentType, Post, PostParams} from "../api/types/post";
import {postsAPI, profileAPI} from "../api/api";
import {setAppStatusAC, SetIsAuthAC, setIsAuthAC} from "./appReducer";
import {setErrorAc, setIsLoggedInAC, setLoggedInActionType} from "./AuthReducer";
import {toast} from "react-hot-toast";

const initialState = {
    profile: {} as ProfileResponse,
    posts: [] as Post[],
    userId: null as number | null
}

export const profileReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "PROFILE/SET-USER-PROFILE": {
            return {...state, profile: action.payload}
        }
        case "PROFILE/SET-PROFILE-POSTS": {
            return {...state, posts: action.payload}
        }
        case "PROFILE/SET-POST-COMMENT": {
            debugger
            return {...state, posts: state.posts.map(p=>p.id===action.id ? {...p,comments:action.payload} : p)}
        }
        case "PROFILE/FILTER-PROFILE-POSTS": {
            debugger
            return {...state, posts: state.posts.filter(f=>f.id!==action.id)}
        }
        case "PROFILE/SET-AUTH-ID": {
            return {...state, userId: action.id}
        }

        default:
            return state
    }
}

//actions
export const getUserProfile = (payload: ProfileResponse) => {
    return {
        type: "PROFILE/SET-USER-PROFILE",
        payload
    } as const
}
export const getProfilePostsAC = (payload: Post[]) => {
    return {
        type: "PROFILE/SET-PROFILE-POSTS",
        payload
    } as const
}
export const filterProfilePostsAC = (id: number) => {
    return {
        type: "PROFILE/FILTER-PROFILE-POSTS",
        id
    } as const
}
export const setAuthIdAC = (id: number) => {
    return {
        type: "PROFILE/SET-AUTH-ID",
        id
    } as const
}

const setPostComments = (id:number,payload:CommentType[]) => {
    debugger
    return {
        type: "PROFILE/SET-POST-COMMENT",
        id,
        payload
    } as const
}

//thunks
export const getProfile = (): ThunkType => async (dispatch: Dispatch, getState: () => AppRootType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await profileAPI.setProfile()
        dispatch(getUserProfile(res.data.data))
        dispatch(setAuthIdAC(res.data.data.id))

        // @ts-ignore
        dispatch(getProfilePosts(getState().profilePage.profile.id, {limit: 100, offset: 0}))
        dispatch(setAppStatusAC('succeeded'))

    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}
export const getProfilePostComments = (id:number,params:PostParams) => async (dispatch: Dispatch) => {
    debugger
    try {
        const res =await postsAPI.setPostComments(id,params)
        dispatch(setPostComments(id,res.data.data))

    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}
export const getProfileById = (id: number) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        debugger
        const res = await profileAPI.getProfileById(id)
        // @ts-ignore
        dispatch(getProfilePosts(id, {limit: 100, offset: 0}))
        dispatch(getUserProfile(res.data.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}
export const getProfilePosts = (id: number, params: PostParams) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await profileAPI.setProfilePosts(id, params)
        dispatch(getProfilePostsAC(res.data.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}

export const updateProfile = (profileData: UpdateProfileParams) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    const formData = new FormData()
    formData.append('update_params', JSON.stringify(profileData))
    // avatarImg && formData.append('avatar', JSON.stringify(someStr))
    try {
        await profileAPI.updateProfile(formData)
        // @ts-ignore
        dispatch(getProfile())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setIsAuthAC(false))
        dispatch(setIsLoggedInAC(false))
        console.log(e)
        dispatch(setAppStatusAC('failed'))
    }
}

export const updateProfileImage = (imageData: any) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    const formData = new FormData()
    formData.append('avatar', imageData.avatar)
    try {
        await profileAPI.updateProfile(formData)
        // @ts-ignore
        dispatch(getProfile())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        // dispatch(setIsAuthAC(false))
        // dispatch(setIsLoggedInAC(false))
        console.log(e)
        toast.error('что-то пошло не так')
        dispatch(setAppStatusAC('failed'))
    }
}

export const changeProfilePassword = (profileData: { old_password_hash: any, new_password_hash: any }) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await profileAPI.changePassword(profileData)
        // @ts-ignore
        dispatch(getProfile())
        dispatch(setAppStatusAC('succeeded'))
        toast.success('Пороль успешно изменен')
    } catch (e) {
        dispatch(setIsAuthAC(false))
        dispatch(setIsLoggedInAC(false))
        console.log(e)
        dispatch(setAppStatusAC('failed'))
    }
}

export const searchProfile = (value: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await profileAPI.searchProfile(value)
        dispatch(getUserProfile(res))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setIsAuthAC(false))
        dispatch(setIsLoggedInAC(false))
        console.log(e)
        dispatch(setAppStatusAC('failed'))
    }
}


//types
type initialStateType = typeof initialState
export type getUserProfileAT = ReturnType<typeof getUserProfile>

export type FilterProfilePostsAT = ReturnType<typeof filterProfilePostsAC>

type ActionsType =
    getUserProfileAT
    | ReturnType<typeof getProfilePostsAC>
    | ReturnType<typeof setAuthIdAC>
    | SetIsAuthAC
    | setLoggedInActionType
    | ReturnType<typeof setPostComments>
    | FilterProfilePostsAT


type ThunkType = ThunkAction<any, AppRootType, {}, ActionsType>
