import {Avatar} from "./profile";

export interface Post {
    id: number
    author: Author
    text: string
    image: Avatar
    topic: string
    publish_time: string
    is_user_liked: boolean
    likes_count: number
    comments_count: number
    comments?:CommentType[]
}

export interface PostParams {
    topic?: string
    limit: number
    offset: number
}
export interface AddPostParams {
    create_params:{
        text: string
        topic: string
    }
    image?: string
}
export interface CommentType {
    author:Author
    id: number
    send_time:string
    text:string
}

export interface IsLikedStatusParams {
    is_liked: boolean
}


export interface Author {
    id: number
    username: string
    first_name: string
    last_name: string
    avatar: Avatar

}

export interface ChannelParams {
    limit: number
    offset: number
}