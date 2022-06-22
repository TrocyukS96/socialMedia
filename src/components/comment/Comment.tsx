import {FC, useState} from "react";
import s from './styles.module.scss';
import {toCorrectTime} from "../../utils/toCorrectTime";

interface Iprops {
    firstName: string
    lastName: string
    image: string
    time: string
    text: string
}
export const Comment:FC<Iprops>=({firstName,lastName,image,time,text})=>{

    const titleStr= firstName && lastName ? `${firstName} ${lastName}` : 'Без имени'

    return(
        <div className={s.comment}>
            <div className={s.commentTop}>
                <img src={image} />
                <div className={s.topText}>
                    <h5 className={s.title}>{titleStr}</h5>
                    <div className={s.time}>{toCorrectTime(time,true)}</div>
                </div>

            </div>
            <div className={s.content}>{text}</div>

        </div>
    )
}