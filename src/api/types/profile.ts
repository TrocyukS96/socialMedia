export interface ProfileResponse {
    id:number
    username:string
    email:string
    first_name:string
    last_name:string
    avatar:Avatar
    interests:string[]
}


export interface Avatar{
    url:string
    size:{
        width:number
        height:number
    }
}

export interface UpdateProfileParams{
    first_name?:string
    last_name?:string
    interests?:string[]
    avatar?:string
}