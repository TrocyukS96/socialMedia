import React from "react";
import FetchingIcon from "../../assets/images/users/loading-icon.jpg";
import s from './styles.module.scss';

export const Preloader = () => {
    return (
        <div className={s.preloader} style={{backgroundColor: 'white'}}>
            <img src={FetchingIcon}/>
        </div>
    );
}