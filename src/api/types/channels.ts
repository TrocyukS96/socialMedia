import {Avatar} from "./profile";

export interface Channels{
    id: number;
    name: string;
    type: string;
    image: Avatar;
}

export interface Author {
    id: number
    username: string
    first_name: string
    last_name: string
    avatar: Avatar
}

export interface Members {
    id: number
    username: string
    first_name: string
    last_name: string
    avatar: Avatar
}

export interface CreateChannel {
    create_params:{
        name: string
        type: string
        //todo : добавление по id пользователя, проверь правильно ли!
        members_ids: {
            id: number
        }
    }
    image?: string
}

export interface EditChannel {
    update_params:{ 
        name: string
        member_ids: {
            id: number
        }
    }
    image?: string
}

export interface LastMessage {
    id: number
    author: Author
    text: string
    send_time: string
}

export interface GetMessages {
    id: number
    author: Author
    text: string
    send_time: string
}
