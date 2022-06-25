import Paper from "@mui/material/Paper";
import s from "./styles.module.scss";
import {Button, TextField} from "@mui/material";
import React, {FC, useEffect} from "react";
import {ChannelMessage} from "../../../api/types/channels";
import {useDispatch} from "react-redux";
import {startMessagesListening} from "../../../redux/ChatReducer";

interface IProps{
    messages:ChannelMessage[]
    channelId:number | null
}
export const ChannelMessages:FC<IProps> =(
    {messages,channelId}
)=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        if(channelId){
            dispatch(startMessagesListening(channelId))
        }
    },[])
    return(
        <Paper variant="outlined" className={s.inner}>
            <div className={s.chatMessageList}>
                {messages.map((message,index)=>{
                    return(
                        <div className={s.message} key={index}>
                            {/*<img src={chanel.image.url} alt="channel image"/>*/}
                            <div className={s.top}>
                                <img className={s.messageImage} src={message?.author?.avatar?.url} alt="channel image"/>
                                <h6 className={s.username}>{message?.author?.first_name}</h6>
                            </div>
                            <div className={s.text}>{message?.text}</div>
                        </div>

                    )
                })}

                <div className={s.addMessageBlock}>
                    <div className={s.inputWrap}>
                        <TextField placeholder={'Введите текст'} className={s.input}/>
                    </div>
                    <div className={s.btnWrap}>
                        <Button variant={'contained'}>Отправить</Button>
                    </div>
                </div>
            </div>
        </Paper>
    )
}