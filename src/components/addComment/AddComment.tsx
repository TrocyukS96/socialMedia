import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, {ChangeEventHandler, FC, useState, } from "react";
import s from './styles.module.scss';
import {Button} from "@mui/material";
interface Iprops {
    addComment:(text:string)=>void
}

export const AddComment:FC<Iprops> =({addComment})=>{

    const [inputText,setInputText]=useState('')

    const sendCommentText=()=>{
        addComment(inputText)
        setInputText('')
    }

    return(
        <div className={s.block}>
            <h5>Добавить комментарий</h5>
            <div className={s.inputWrap}>
                <textarea
                    aria-label="empty textarea"
                    placeholder={'Введите комментарий'}
                    onChange={(e)=>setInputText(e.currentTarget.value)}
                    value={inputText}
                />
            </div>
            <Button variant={'contained'} className={s.sendBtn} onClick={sendCommentText}>Отправить</Button>
        </div>
    )
}