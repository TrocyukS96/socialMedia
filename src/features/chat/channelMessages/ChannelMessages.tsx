import Paper from "@mui/material/Paper";
import s from "./styles.module.scss";
import {Button, TextField} from "@mui/material";
import React, {FC, useEffect, useState} from "react";
import {ChannelMessage} from "../../../api/types/channels";
import {chatAPI} from "../../../api/api";

interface IProps{
    messages:ChannelMessage[]
    channelId:number | null
}
export const ChannelMessages:FC<IProps> =(
    {messages,channelId}
)=>{
    let ws = new WebSocket(`wss://wires-api.herokuapp.com/v1/channels/${channelId}/listen`)
    ws.onopen = function(e) {
        alert("[open] Соединение установлено");
        alert("Отправляем данные на сервер");
        ws.send("Меня зовут Джон");
    };
    return(
        <Paper variant="outlined" className={s.inner}>
            <div className={s.chatMessageList}>
                {messages.map((message,index)=>{
                    return(
                        <div className={s.message}>
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