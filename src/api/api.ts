import axios, {AxiosRequestConfig} from "axios";
import {LoginParamsType, LogOutParamsType, RegisterParamsType} from "./types/auth";
import {ProfileResponse} from "./types/profile";
import {ChannelParams, PostParams} from "./types/post";

export const instance = axios.create({
    baseURL: 'https://wires-api.herokuapp.com/v1/',
})
instance.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('access_token');
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
    return config
})

export const profileAPI = {
    setProfile() {
        return instance.get(`/user`)
    },
    getProfileById(id: number) {
        return instance.get(`/user/${id}`)
    },
    setProfilePosts(id: number, params: PostParams) {
        return instance.get(`user/${id}/posts`, {
            params: {
                ...params
            }
        })
    },
    updateProfile(profileData: any) {
        return instance.put('/user/update', profileData)
    },
    changePassword(params: { old_password_hash: any, new_password_hash: any }) {
        return instance.put('/user/change_password', params)
    },
    searchProfile(value: string) {
        return instance.get<null, ProfileResponse>(`user/search?query=${value}`)
    },
}

export const authAPI = {
    register(data: RegisterParamsType) {
        return instance.post<RegisterParamsType, any>(`user/register`, data)
    },
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, any>(`user/login`, data).then(res => res.data.data)
    },
    logOut(data: LogOutParamsType) {
        return instance.post<LogOutParamsType, AxiosRequestConfig>(`user/logout`, data)
    },
    me() {
        return instance.get<null, ProfileResponse>(`user`)
    },
}

export const postsAPI = {
    setPosts(params: PostParams) {
        return instance.get<PostParams, any>('posts', {
            params: {
                ...params
            }
        })
    },
    deletePost(id: number) {
        return instance.delete<PostParams, any>(`posts/${id}`)
    },
    switchIsLikedStatus(id: number, likedStatus: boolean) {
        return instance.post(`posts/${id}/like?is_liked=${likedStatus}`)
    },
    setPostComments(id: number, params: PostParams) {
        return instance.get(`posts/${id}/comment`, {
            params: {
                ...params
            }
        })
    },
    addPostComment(id: number, text: string) {
        debugger
        return instance.post(`posts/${id}/comment`, {text})
    },
    createPost(params: any) {
        return instance.post('posts/create', params)
    },
    updatePost(id: number, params: any) {
        return instance.put(`posts/${id}`, params)
    }

}

export const chatAPI = {
    setChannels() {
        return instance.get('channels')
    },
    fetchMessagesById(id:number,params:ChannelParams) {
        return instance.get(`channels/${id}/messages`,{
            params:{
                ...params
            }
        })
    },
}
