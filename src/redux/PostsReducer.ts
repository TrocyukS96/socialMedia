import {Dispatch} from "redux";
import {AppRootType} from "./redux-store";
import {ThunkAction} from 'redux-thunk';
import {AddPostParams, CommentType, Post, PostParams} from "../api/types/post";
import {postsAPI} from "../api/api";
import {setAppStatusAC} from "./appReducer";
import {setErrorAc} from "./AuthReducer";

const initialState = {
    posts: [] as Post[],
}


export const postsReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "POSTS/SET-POSTS": {
            return {...state, posts: action.payload}
        }
        case "POSTS/SET-IS_LIKED_STATUS": {
            return {...state, posts: state.posts.map(p=>p.id===action.id ? {...p,is_user_liked:action.likedStatus,likes_count:action.likedStatus ? p.likes_count+1 : p.likes_count-1} : p)}
        }
        case "POSTS/SET-POST-COMMENT": {
            return {...state, posts: state.posts.map(p=>p.id===action.id ? {...p,comments:action.payload} : p)}
        }

        default:
            return state
    }
}

//actions
export const setPosts = (payload: Post[]) => {
    return {
        type: "POSTS/SET-POSTS",
        payload
    } as const
}
 const setIsLikedStatus = (id:number,likedStatus:boolean) => {
    return {
        type: "POSTS/SET-IS_LIKED_STATUS",
        id,likedStatus
    } as const
}
const setPostComments = (id:number,payload:CommentType[]) => {
    return {
        type: "POSTS/SET-POST-COMMENT",
        id,
        payload
    } as const
}

//thunks
export const getPosts = (params:PostParams) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res =await postsAPI.setPosts(params)
        dispatch(setPosts(res.data.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}
export const removePost = (id:number) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await postsAPI.deletePost(id)
        // @ts-ignore
        dispatch(getPosts({limit: 10, offset: 0}))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}
export const changeLikesStatus = (id:number,likedStatus:boolean) => async (dispatch: Dispatch) => {
    try {
        await postsAPI.switchIsLikedStatus(id,likedStatus)
        dispatch(setIsLikedStatus(id,likedStatus))
    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}
export const getPostsComments = (id:number,params:PostParams) => async (dispatch: Dispatch) => {

    try {
        const res =await postsAPI.setPostComments(id,params)
        dispatch(setPostComments(id,res.data.data))

    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}
export const addPostComment = (id:number,text:string): ThunkType => async (dispatch: Dispatch,getState: () => AppRootType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await postsAPI.addPostComment(id,text)
        // @ts-ignore
        dispatch(getPostsComments(id,{limit: 10, offset: 0}))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}
export const addPost = (params:AddPostParams): ThunkType => async (dispatch: Dispatch,getState: () => AppRootType) => {
    dispatch(setAppStatusAC('loading'))
    debugger
    const addPostData = {
            text: params.create_params.text,
            topic: params.create_params.topic
    }
    const addImageData = {
        image: params.image,
    }
    const formData= new FormData()
    formData.append('create_params',JSON.stringify(addPostData))
    // @ts-ignore
    formData.append('image',addImageData.image)
    try {
        await postsAPI.createPost(formData)
        // @ts-ignore
        dispatch(getPosts({limit: 10, offset: 0}))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}
export const updatePost = (id:number,params:AddPostParams): ThunkType => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    const addPostData = {
        text: params.create_params.text,
        topic: params.create_params.topic
    }
    const formData= new FormData()
    formData.append('update_params',JSON.stringify(addPostData))
    try {
        await postsAPI.updatePost(id,formData)
        // @ts-ignore
        dispatch(getPosts({limit: 10, offset: 0}))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(setErrorAc(e.response.error))
        dispatch(setAppStatusAC('failed'))
    }
}

//types
type initialStateType = typeof initialState

type ActionsType =
    | ReturnType<typeof setPosts>
    | ReturnType<typeof setIsLikedStatus>
    | ReturnType<typeof setPostComments>


type ThunkType = ThunkAction<any, AppRootType, {}, ActionsType>
